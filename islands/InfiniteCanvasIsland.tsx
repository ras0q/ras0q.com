import InfiniteCanvas from "../components/InfiniteCanvas.tsx";
import { domain, subDomains, subRoutes } from "../libs/consts.ts";
import { Connector } from "../components/Connector.tsx";
import { LinkCard } from "../components/LinkCard.tsx";
import { Fragment } from "preact/jsx-runtime";
import { useRef } from "preact/hooks";
import { signal } from "@preact/signals";

export default function InfiniteCanvasIsland() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subDomainsRefs = subDomains.map(() => useRef<HTMLDivElement>(null));
  const subRoutesRefs = subRoutes.map(() => useRef<HTMLDivElement>(null));
  const nodePositions = signal(
    [domain, ...subDomains, ...subRoutes].map(({ left, top }) => ({
      left,
      top,
      offsetLeft: 0,
      offsetTop: 0,
    })),
  );

  return (
    <InfiniteCanvas
      childRefs={[titleRef, ...subDomainsRefs, ...subRoutesRefs]}
      titleRef={titleRef}
      nodePositions={nodePositions.value}
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
          left: domain.left,
          top: domain.top,
        }}
        ref={titleRef}
      >
        {domain.name}
      </h1>

      {subDomains.map(({ name, description, left, top }, i) => (
        <Fragment key={name}>
          <Connector fromRef={subDomainsRefs[i]} toRef={titleRef} />
          <LinkCard
            divRef={subDomainsRefs[i]}
            title={name}
            body={description}
            href={`https://${name}.${domain.name}`}
            style={{
              position: "absolute",
              left,
              top,
            }}
          />
        </Fragment>
      ))}

      {subRoutes.map(({ path, description, left, top }, i) => (
        <Fragment key={path}>
          <Connector fromRef={subRoutesRefs[i]} toRef={titleRef} r2l />
          <LinkCard
            divRef={subRoutesRefs[i]}
            title={path}
            body={description}
            href={path}
            style={{
              position: "absolute",
              left,
              top,
            }}
          />
        </Fragment>
      ))}
    </InfiniteCanvas>
  );
}
