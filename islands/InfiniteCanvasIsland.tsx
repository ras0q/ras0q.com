import { useRef } from "preact/hooks";
import { Connector } from "../components/Connector.tsx";
import { InfiniteCanvas } from "../components/InfiniteCanvas.tsx";
import { LinkCard } from "../components/LinkCard.tsx";
import { domain, subDomains, subRoutes } from "../libs/consts.ts";

export default function InfiniteCanvasIsland() {
  const titleID = "title";
  const subDomainIDs = Array.from(
    { length: subDomains.length },
    (_, i) => `subdomains_${i}`,
  );
  const subRoutesIDs = Array.from(
    { length: subRoutes.length },
    (_, i) => `subroutes${i}`,
  );
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subDomainsRefs = subDomains.map(() => useRef<HTMLDivElement>(null));
  const subRoutesRefs = subRoutes.map(() => useRef<HTMLDivElement>(null));

  return (
    <InfiniteCanvas titleRef={titleRef}>
      <h1
        id={titleID}
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

      {subDomainIDs.map((id) => <Connector leftID={id} rightID={titleID} />)}
      {subDomains.map(({ name, description, left, top }, i) => (
        <div
          id={subDomainIDs[i]}
          style={{
            position: "absolute",
            left,
            top,
          }}
          key={name}
          ref={subDomainsRefs[i]}
        >
          <LinkCard
            title={name}
            body={description}
            href={`https://${name}${domain.name}`}
          />
        </div>
      ))}

      {subRoutesIDs.map((id) => <Connector leftID={titleID} rightID={id} />)}
      {subRoutes.map(({ path, description, left, top }, i) => (
        <div
          id={subRoutesIDs[i]}
          style={{
            position: "absolute",
            left,
            top,
          }}
          key={path}
          ref={subRoutesRefs[i]}
        >
          <LinkCard
            title={path}
            body={description}
            href={path}
          />
        </div>
      ))}
    </InfiniteCanvas>
  );
}
