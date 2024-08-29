import { batch, computed, effect, useSignal } from "@preact/signals";
import { ComponentChildren, RefObject, toChildArray, VNode } from "preact";
import { useEffect, useRef } from "preact/hooks";
// @ts-types="../static/styled-system/css/index.d.mts"
import { css } from "../static/styled-system/css/index.mjs";

type Props = {
  children: ComponentChildren;
};

export const InfiniteCanvas = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasElements = toChildArray(children).flatMap((c) =>
    (c as VNode).ref !== undefined
      ? {
        ref: (c as VNode).ref as RefObject<HTMLElement>,
        offset: {
          x: useSignal(0),
          y: useSignal(0),
        },
      }
      : []
  );

  const targetIndex = useSignal<number | undefined>(undefined);
  // NOTE: Signals currently supports string style values.
  // REF: https://github.com/preactjs/signals/issues/255#issuecomment-1318899145
  const bgOffsetX = useSignal(0);
  const bgOffsetY = useSignal(0);
  const bgScale = useSignal(1);

  effect(() => {
    canvasElements.map((c) => {
      const el = c.ref.current;
      if (!el) return;

      const dx =
        (el.offsetLeft + bgOffsetX.value + c.offset.x.value) * bgScale.value -
        el.offsetLeft;
      const dy =
        (el.offsetTop + bgOffsetY.value + c.offset.y.value) * bgScale.value -
        el.offsetTop;
      const transform =
        `translate(${dx}px, ${dy}px) scale(${bgScale.value}, ${bgScale.value})`;
      if (el.style.transform != transform) {
        el.style.transformOrigin = "top left";
        el.style.transform = transform;
      }
    });
  });

  const handlePointerDown = (e: PointerEvent) => {
    targetIndex.value = canvasElements.findIndex((c) => {
      const el = c.ref.current;
      if (!el) return false;

      const rect = el.getBoundingClientRect();
      const { left, top, right, bottom } = rect;
      const { clientX: ex, clientY: ey } = e;
      return ex >= left && ex <= right && ey >= top && ey <= bottom;
    });
  };

  const handlePointerMove = (e: PointerEvent) => {
    const container = containerRef.current;
    if (!container || targetIndex.value === undefined) return;

    container.setPointerCapture(e.pointerId);
    container.style.touchAction = "none";

    const i = targetIndex.value;
    if (i === -1) {
      batch(() => {
        bgOffsetX.value += e.movementX;
        bgOffsetY.value += e.movementY;
      });
      return;
    }

    batch(() => {
      canvasElements[i].offset.x.value += e.movementX;
      canvasElements[i].offset.y.value += e.movementY;
    });
  };

  const handlePointerUp = (e: PointerEvent) => {
    const container = containerRef.current;
    if (!container || targetIndex.value === undefined) return;

    const i = targetIndex.value;
    targetIndex.value = undefined;
    container.releasePointerCapture(e.pointerId);
    container.style.touchAction = "auto";

    if (i == -1) return;

    // return to original position with damping oscillation
    const omega = 0.01;
    const b = 0.001;
    const f = 0.01;
    const ampX = canvasElements[i].offset.x.value;
    const ampY = canvasElements[i].offset.y.value;
    const ts0 = performance.now();
    const returnToOriginal = (ts: DOMHighResTimeStamp) => {
      const { x: offsetX, y: offsetY } = canvasElements[i].offset;
      if (Math.abs(offsetX.value) < f && Math.abs(offsetY.value) < f) return;

      batch(() => {
        const t = ts - ts0;
        const dx = ampX * Math.exp(-b * t) * Math.cos(omega * t);
        const dy = ampY * Math.exp(-b * t) * Math.cos(omega * t);
        canvasElements[i].offset.x.value = dx;
        canvasElements[i].offset.y.value = dy;
      });

      requestAnimationFrame(returnToOriginal);
    };
    requestAnimationFrame(returnToOriginal);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    bgScale.value += -0.05 * Math.sign(e.deltaY);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const bgSize = computed(() => 16 * bgScale.value);
  const bgImage = (deg: number) =>
    `linear-gradient(${deg}deg, transparent ${
      bgSize.value - 1
    }px, var(--ctp-latte-surface0) ${bgSize.value}px)`;

  return (
    <div
      class={css`
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;

        & > * {
          cursor: grab;
          &:active {
            cursor: grabbing;
          }
        }
      `}
      style={{
        backgroundImage: `${bgImage(0)}, ${bgImage(90)}`,
        backgroundSize: `${bgSize.value}px ${bgSize.value}px`,
        backgroundPositionX: `${bgOffsetX.value * bgScale.value}px`,
        backgroundPositionY: `${bgOffsetY.value * bgScale.value}px`,
      }}
      id="container"
      ref={containerRef}
    >
      {children}
    </div>
  );
};
