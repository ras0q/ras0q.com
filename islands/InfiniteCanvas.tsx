import { Connector } from "../components/Connector.tsx";
import { LinkCard } from "../components/LinkCard.tsx";
import { domain, subDomains, subRoutes } from "../libs/consts.ts";
import { Fragment, RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

export default function InfiniteCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subDomainsRefs = subDomains.map(() => useRef<HTMLDivElement>(null));
  const subRoutesRefs = subRoutes.map(() => useRef<HTMLDivElement>(null));
  const draggableRefs: RefObject<HTMLElement>[] = [
    titleRef,
    ...subDomainsRefs,
    ...subRoutesRefs,
  ];
  const draggablePositions: { left: number; top: number }[] = [
    domain,
    ...subDomains,
    ...subRoutes,
  ];
  const targetRef = useRef<{ id: string; left: number; top: number }>();
  const pointerIsDownRef = useRef(false);

  const handlePointerDown = (e: PointerEvent) => {
    pointerIsDownRef.current = true;

    const target = draggableRefs.find((ref) => {
      const el = ref.current;
      if (!el) return false;

      const rect = el.getBoundingClientRect();
      const ex = e.clientX;
      const ey = e.clientY;
      return ex >= rect.left && ex <= rect.right && ey >= rect.top &&
        ey <= rect.bottom;
    })?.current;
    targetRef.current = target
      ? { id: target.id, left: target.offsetLeft, top: target.offsetTop }
      : undefined;
  };

  const handlePointerMove = (e: PointerEvent) => {
    const container = containerRef.current;
    if (!container || !pointerIsDownRef.current) return;

    container.setPointerCapture(e.pointerId);
    container.style.touchAction = "none";

    const target = targetRef.current;
    if (!target) {
      draggableRefs.forEach((ref) => {
        const el = ref.current;
        if (!el) return;

        const left = el.offsetLeft + e.movementX;
        const top = el.offsetTop + e.movementY;
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
      });
      return;
    }

    const targetEl = document.getElementById(target.id);
    if (!targetEl) return;

    const left = targetEl.offsetLeft + e.movementX;
    const top = targetEl.offsetTop + e.movementY;
    targetEl.style.left = `${left}px`;
    targetEl.style.top = `${top}px`;
  };

  const handlePointerUp = (e: PointerEvent) => {
    const container = containerRef.current;
    if (!container || !pointerIsDownRef.current) return;

    pointerIsDownRef.current = false;

    container.releasePointerCapture(e.pointerId);
    container.style.touchAction = "auto";

    const target = targetRef.current;
    if (!target) {
      targetRef.current = undefined;
      return;
    }

    const targetEL = document.getElementById(target.id);
    if (!targetEL) {
      targetRef.current = undefined;
      return;
    }

    // return to original position with damping oscillation
    const omega = 0.01;
    const b = 0.001;
    const f = 0.01;
    const { left: originalLeft, top: originalTop } = target;
    const ampX = targetEL.offsetLeft - originalLeft;
    const ampY = targetEL.offsetTop - originalTop;
    const ts0 = performance.now();
    const returnToOriginal = (ts: DOMHighResTimeStamp) => {
      const { offsetLeft, offsetTop } = targetEL;
      if (
        Math.abs(offsetLeft - originalLeft) < f &&
        Math.abs(offsetTop - originalTop) < f
      ) return;

      const t = ts - ts0;
      const dx = ampX * Math.exp(-b * t) * Math.cos(omega * t);
      const dy = ampY * Math.exp(-b * t) * Math.cos(omega * t);
      targetEL.style.left = `${originalLeft + dx}px`;
      targetEL.style.top = `${originalTop + dy}px`;

      requestAnimationFrame(returnToOriginal);
    };
    requestAnimationFrame(returnToOriginal);
  };

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const titleRect = title.getBoundingClientRect();
    const dx = (container.clientWidth - titleRect.width) / 2 - domain.left;
    const dy = (container.clientHeight - titleRect.height) / 2 - domain.top;
    draggableRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      el.id = `draggable-${i}`;

      const { left, top } = draggablePositions[i];
      el.style.position = "absolute";
      el.style.left = `${left + dx}px`;
      el.style.top = `${top + dy}px`;
    });

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggableRefs]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
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
