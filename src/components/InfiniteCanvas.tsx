import { batch, useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { css } from "../styled-system/css/index.mjs";

type Props = {
  children: ComponentChildren;
  centerID?: string;
};

export const InfiniteCanvas = ({ children, centerID }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const translateX = useSignal(0);
  const translateY = useSignal(0);
  const scale = useSignal(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const abortController = new AbortController();
    el.addEventListener("pointerdown", () => {
      const pointerAbortController = new AbortController();
      document.addEventListener("pointermove", (e: PointerEvent) => {
        batch(() => {
          translateX.value += e.movementX;
          translateY.value += e.movementY;
        });
      }, { signal: pointerAbortController.signal });

      document.addEventListener("pointerup", () => {
        pointerAbortController.abort("pointerup");
      }, {
        signal: pointerAbortController.signal,
        once: true,
      });
    }, { signal: abortController.signal });

    // el.addEventListener("wheel", (e: WheelEvent) => {
    //   e.preventDefault();
    //   scale.value += -0.05 * Math.sign(e.deltaY);
    // }, { signal: abortController.signal });

    return () => {
      abortController.abort("unmount");
    };
  }, []);

  useEffect(() => {
    if (!centerID) return;

    const el = ref.current;
    const resizerEL = resizerRef.current;
    const centerEL = document.getElementById(centerID);
    if (!el || !resizerEL || !centerEL) return;

    const rect = el.getBoundingClientRect();
    const centerRect = centerEL.getBoundingClientRect();
    translateX.value = (rect.width - centerRect.width) / 2 +
      rect.left - centerRect.left;
    translateY.value = (rect.height - centerRect.height) / 2 +
      rect.top - centerRect.top;

    const transitionAbortController = new AbortController();
    resizerEL.style.transition = "transform 0.5s ease";
    resizerEL.addEventListener("transitionend", () => {
      resizerEL.style.transition = "";
    }, { signal: transitionAbortController.signal });

    // Disable drag and drop
    resizerEL.querySelectorAll("a,img").forEach((child) => {
      if (child instanceof HTMLElement) {
        child.draggable = false;
      }
    });
  }, [centerID]);

  return (
    <div
      ref={ref}
      class={css`
        --bg-size: 16px;
        --bg-position: 0px 0px;

        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        background-image:
          linear-gradient(
            0deg,
            transparent calc(var(--bg-size) - 1px),
            var(--colors-surface0) var(--bg-size)
          ),
          linear-gradient(
            90deg,
            transparent calc(var(--bg-size) - 1px),
            var(--colors-surface0) var(--bg-size)
          );
        background-size: var(--bg-size) var(--bg-size);
        background-position: var(--bg-position);
      `}
      style={{
        "--bg-size": `${16 * scale.value}px`,
        "--bg-position": `${translateX.value * scale.value}px ${
          translateY.value * scale.value
        }px`,
      }}
    >
      <div
        ref={resizerRef}
        class={css`
          --translate: 0px, 0px;
          --scale: 1;

          transform: translate(var(--translate)) scale(var(--scale));
          user-select: none;
        `}
        style={{
          "--translate": `${translateX.value}px, ${translateY.value}px`,
          "--scale": `${scale.value}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
