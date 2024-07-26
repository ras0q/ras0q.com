import { domain } from "../libs/consts.ts";
import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { RefObject } from "preact";

// TODO: propの対応をindexだけで繋いでいるので1つのobjectに集約したい
type Props = {
  children: ComponentChildren;
  childRefs: RefObject<HTMLElement>[];
  titleRef: RefObject<HTMLElement>;
};

export default function InfiniteCanvas(
  { children, childRefs, titleRef }: Props,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetIndex = useSignal<number | undefined>(undefined);
  // NOTE: Signals currently supports string style values.
  // REF: https://github.com/preactjs/signals/issues/255#issuecomment-1318899145
  const bgOffsetX = useSignal(0);
  const bgOffsetY = useSignal(0);
  const elOffsets = Array.from(
    { length: childRefs.length },
    () => ({ x: 0, y: 0 }),
  );

  const handlePointerDown = (e: PointerEvent) => {
    targetIndex.value = childRefs.findIndex((ref) => {
      const el = ref.current;
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
      bgOffsetX.value += e.movementX;
      bgOffsetY.value += e.movementY;

      childRefs.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;

        moveElement(el, elOffsets[i]);
      });
      return;
    }

    const targetEl = childRefs[i]?.current;
    if (!targetEl) return;

    elOffsets[i].x += e.movementX;
    elOffsets[i].y += e.movementY;
    moveElement(targetEl, elOffsets[i]);
  };

  const handlePointerUp = (e: PointerEvent) => {
    const container = containerRef.current;
    if (!container || targetIndex.value === undefined) return;

    const i = targetIndex.value;
    targetIndex.value = undefined;
    container.releasePointerCapture(e.pointerId);
    container.style.touchAction = "auto";

    const targetEL = childRefs[i]?.current;
    if (!targetEL) return;

    // return to original position with damping oscillation
    const omega = 0.01;
    const b = 0.001;
    const f = 0.01;
    const { x: ampX, y: ampY } = elOffsets[i];
    const ts0 = performance.now();
    const returnToOriginal = (ts: DOMHighResTimeStamp) => {
      const { x: offsetX, y: offsetY } = elOffsets[i];
      if (Math.abs(offsetX) < f && Math.abs(offsetY) < f) return;

      const t = ts - ts0;
      const dx = ampX * Math.exp(-b * t) * Math.cos(omega * t);
      const dy = ampY * Math.exp(-b * t) * Math.cos(omega * t);
      elOffsets[i] = {
        x: dx,
        y: dy,
      };
      moveElement(targetEL, elOffsets[i]);

      requestAnimationFrame(returnToOriginal);
    };
    requestAnimationFrame(returnToOriginal);
  };

  const moveElement = (el: HTMLElement, offset: { x: number; y: number }) => {
    const dx = offset.x + bgOffsetX.value;
    const dy = offset.y + bgOffsetY.value;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const titleRect = title.getBoundingClientRect();
    bgOffsetX.value = (container.clientWidth - titleRect.width) / 2 -
      domain.left;
    bgOffsetY.value = (container.clientHeight - titleRect.height) / 2 -
      domain.top;
    childRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      moveElement(el, elOffsets[i]);
    });

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const bgSize = 16;
  const bgImage = (deg: number) =>
    `linear-gradient(${deg}deg, transparent ${
      bgSize - 1
    }px, var(--ctp-latte-surface0) ${bgSize}px)`;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        // TODO: grab https://github.com/ras0q/ras0q.com/blob/1e18f972a885cfc2b96882a1abae9c2ff78cd4bc/src/components/InfiniteCanvas.tsx
        backgroundImage: `${bgImage(0)}, ${bgImage(90)}`,
        backgroundSize: `${bgSize}px ${bgSize}px`,
        backgroundPositionX: `${bgOffsetX.value}px`,
        backgroundPositionY: `${bgOffsetY.value}px`,
      }}
      id="container"
      ref={containerRef}
    >
      {children}
    </div>
  );
}
