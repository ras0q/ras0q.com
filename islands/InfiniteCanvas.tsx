import { Connector } from "../components/Connector.tsx";
import { LinkCard } from "../components/LinkCard.tsx";
import { domain, subDomains, subRoutes } from "../libs/consts.ts";
import { Fragment, RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { signal } from "@preact/signals";

type NodePosition = {
  left: number;
  top: number;
  offsetLeft: number;
  offsetTop: number;
};

export default function InfiniteCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subDomainsRefs = subDomains.map(() => useRef<HTMLDivElement>(null));
  const subRoutesRefs = subRoutes.map(() => useRef<HTMLDivElement>(null));
  const elementRefs: RefObject<HTMLElement>[] = [
    titleRef,
    ...subDomainsRefs,
    ...subRoutesRefs,
  ];
  const nodePositions = signal<NodePosition[]>(
    [domain, ...subDomains, ...subRoutes].map(({ left, top }) => ({
      left,
      top,
      offsetLeft: 0,
      offsetTop: 0,
    })),
  );
  const targetIndex = signal<number | undefined>(undefined);
  const backgroundOffset = signal({ left: 0, top: 0 });

  const handlePointerDown = (e: PointerEvent) => {
    targetIndex.value = elementRefs.findIndex((ref) => {
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
      backgroundOffset.value.left += e.movementX;
      backgroundOffset.value.top += e.movementY;

      elementRefs.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;

        moveElement(el, nodePositions.value[i]);
      });
      return;
    }

    const targetEl = elementRefs[i].current;
    if (!targetEl) return;

    nodePositions.value[i].offsetLeft += e.movementX;
    nodePositions.value[i].offsetTop += e.movementY;
    moveElement(targetEl, nodePositions.value[i]);
  };

  const handlePointerUp = (e: PointerEvent) => {
    const container = containerRef.current;
    if (!container || targetIndex.value === undefined) return;

    const i = targetIndex.value;
    targetIndex.value = undefined;
    container.releasePointerCapture(e.pointerId);
    container.style.touchAction = "auto";

    const target = nodePositions.value[i];
    const targetEL = elementRefs[i].current;
    if (!targetEL) return;

    // return to original position with damping oscillation
    const omega = 0.01;
    const b = 0.001;
    const f = 0.01;
    const { offsetLeft: ampX, offsetTop: ampY } = target;
    const ts0 = performance.now();
    const returnToOriginal = (ts: DOMHighResTimeStamp) => {
      const nowTarget = nodePositions.value[i];
      const { offsetLeft: nowOffsetLeft, offsetTop: nowOffsetTop } = nowTarget;
      if (Math.abs(nowOffsetLeft) < f && Math.abs(nowOffsetTop) < f) return;

      const t = ts - ts0;
      const dx = ampX * Math.exp(-b * t) * Math.cos(omega * t);
      const dy = ampY * Math.exp(-b * t) * Math.cos(omega * t);
      nodePositions.value[i] = {
        ...nowTarget,
        offsetLeft: dx,
        offsetTop: dy,
      };
      moveElement(targetEL, nodePositions.value[i]);

      requestAnimationFrame(returnToOriginal);
    };
    requestAnimationFrame(returnToOriginal);
  };

  const moveElement = (el: HTMLElement, position: NodePosition) => {
    const { offsetLeft, offsetTop } = position;
    const { left: bgOffsetLeft, top: bgOffsetTop } = backgroundOffset.value;
    const dx = offsetLeft + bgOffsetLeft;
    const dy = offsetTop + bgOffsetTop;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const titleRect = title.getBoundingClientRect();
    backgroundOffset.value = {
      left: (container.clientWidth - titleRect.width) / 2 - domain.left,
      top: (container.clientHeight - titleRect.height) / 2 - domain.top,
    };
    elementRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      moveElement(el, nodePositions.value[i]);
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

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        // TODO: grab https://github.com/ras0q/ras0q.com/blob/1e18f972a885cfc2b96882a1abae9c2ff78cd4bc/src/components/InfiniteCanvas.tsx
      }}
      id="container"
      ref={containerRef}
    >
      <h1
        style={{
          cursor: "grab",
          fontSize: "5rem",
          margin: 0,
          userSelect: "none",
          display: "inline-block",
          background:
            "linear-gradient(120deg, var(--ctp-latte-lavender), var(--ctp-latte-pink))",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          position: "absolute",
          left: nodePositions.value[0].left +
            nodePositions.value[0].offsetLeft +
            backgroundOffset.value.left,
          top: nodePositions.value[0].top +
            nodePositions.value[0].offsetTop +
            backgroundOffset.value.top,
        }}
        ref={titleRef}
      >
        {domain.name}
      </h1>

      {subDomains.map(({ name, description }, i) => (
        <Fragment key={name}>
          <Connector fromRef={subDomainsRefs[i]} toRef={titleRef} />
          <LinkCard
            divRef={subDomainsRefs[i]}
            title={name}
            body={description}
            href={`https://${name}.${domain.name}`}
            style={{
              position: "absolute",
              left: nodePositions.value[i + 1].left +
                nodePositions.value[i + 1].offsetLeft +
                backgroundOffset.value.left,
              top: nodePositions.value[i + 1].top +
                nodePositions.value[i + 1].offsetTop +
                backgroundOffset.value.top,
            }}
          />
        </Fragment>
      ))}

      {subRoutes.map(({ path, description }, i) => (
        <Fragment key={path}>
          <Connector fromRef={subRoutesRefs[i]} toRef={titleRef} r2l />
          <LinkCard
            divRef={subRoutesRefs[i]}
            title={path}
            body={description}
            href={path}
            style={{
              position: "absolute",
              left: nodePositions.value[i + 1 + subDomains.length].left +
                nodePositions.value[i + 1 + subDomains.length].offsetLeft +
                backgroundOffset.value.left,
              top: nodePositions.value[i + 1 + subDomains.length].top +
                nodePositions.value[i + 1 + subDomains.length].offsetTop +
                backgroundOffset.value.top,
            }}
          />
        </Fragment>
      ))}

      {
        /* <button
        style={{ position: 'absolute' }}
        onClick={() => {
          const container = containerRef.current
          if (!container) return

          const data = draggableRefs.map((ref) => {
            const el = ref.current
            if (!el) return { left: 0, top: 0 }

            return {
              left: el.style.left,
              top: el.style.top,
            }
          })

          console.log(data)
        }}
      >
        save
      </button> */
      }
    </div>
  );
}
