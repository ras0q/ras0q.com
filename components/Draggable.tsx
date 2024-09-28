import { batch, useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
// @ts-types="../static/styled-system/css/index.d.mts"
import { css } from "../static/styled-system/css/index.mjs";

type Props = {
  children: ComponentChildren;
  id: string;
  left: number;
  top: number;
};

export const Draggable = ({ children, id, left, top }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const offsetX = useSignal(0);
  const offsetY = useSignal(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.left = `${left + offsetX.value}px`;
    el.style.top = `${top + offsetY.value}px`;
  }, [left, top, offsetX.value, offsetY.value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const abortController = new AbortController();
    el.addEventListener("mousedown", (e: Event) => {
      e.stopPropagation();

      const mouseAbortController = new AbortController();
      document.addEventListener("mousemove", (e: MouseEvent) => {
        batch(() => {
          offsetX.value += e.movementX;
          offsetY.value += e.movementY;
        });
      }, { signal: mouseAbortController.signal });

      document.addEventListener("mouseup", () => {
        mouseAbortController.abort("mouseup");

        // return to original position with damping oscillation
        const omega = 0.01;
        const b = 0.001;
        const f = 0.01;
        const ampX = offsetX.value;
        const ampY = offsetY.value;
        const ts0 = performance.now();
        const returnToOriginal = (ts: DOMHighResTimeStamp) => {
          if (Math.abs(offsetX.value) < f && Math.abs(offsetY.value) < f) {
            return;
          }

          batch(() => {
            const t = ts - ts0;
            const dx = ampX * Math.exp(-b * t) * Math.cos(omega * t);
            const dy = ampY * Math.exp(-b * t) * Math.cos(omega * t);
            offsetX.value = dx;
            offsetY.value = dy;
          });

          requestAnimationFrame(returnToOriginal);
        };
        requestAnimationFrame(returnToOriginal);
      }, {
        signal: mouseAbortController.signal,
        once: true,
      });
    }, { signal: abortController.signal });

    return () => {
      abortController.abort("unmount");
    };
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      class={css`
        position: absolute;
        cursor: grab;
        &:active {
          cursor: grabbing;
        }
      `}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      {children}
    </div>
  );
};
