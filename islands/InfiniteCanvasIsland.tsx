import { useRef } from "preact/hooks";
import { Connector } from "../components/Connector.tsx";
import { InfiniteCanvas } from "../components/InfiniteCanvas.tsx";
import { LinkCard } from "../components/LinkCard.tsx";

export default function InfiniteCanvasIsland() {
  const title = {
    id: "title",
    ref: useRef<HTMLHeadingElement>(null),
    name: "ras0q.com",
    left: 345,
    top: 276,
  };

  const subDomains = [
    {
      name: "slitscan3d.",
      description: "Slit-Scan powered by Three.js",
      left: 36,
      top: 100,
    },
    {
      name: "diary.",
      description: "My diary",
      left: 59,
      top: 400,
    },
  ].map((v, i) => ({
    id: `subdomains_${i}`,
    ref: useRef<HTMLDivElement>(null),
    ...v,
  }));

  const subRoutes = [
    {
      path: "/about",
      description: "About me",
      left: 778,
      top: 43,
    },
    {
      path: "/works",
      description: "Works",
      left: 862,
      top: 275,
    },
    {
      path: "/blog",
      description: "Blog",
      left: 897,
      top: 570,
    },
  ].map((v, i) => ({
    id: `subroutes${i}`,
    ref: useRef<HTMLDivElement>(null),
    ...v,
  }));

  return (
    <InfiniteCanvas>
      <h1
        id={title.id}
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
          left: title.left,
          top: title.top,
        }}
        ref={title.ref}
      >
        {title.name}
      </h1>

      {subDomains.map((v) => <Connector leftID={v.id} rightID={title.id} />)}
      {subDomains.map(({ id, ref, name, description, left, top }, i) => (
        <div
          id={id}
          style={{
            position: "absolute",
            left,
            top,
          }}
          key={name}
          ref={ref}
        >
          <LinkCard
            title={name}
            body={description}
            href={`https://${name}${title.name}`}
          />
        </div>
      ))}

      {subRoutes.map((v) => <Connector leftID={title.id} rightID={v.id} />)}
      {subRoutes.map(({ id, ref, path, description, left, top }, i) => (
        <div
          id={id}
          style={{
            position: "absolute",
            left,
            top,
          }}
          key={path}
          ref={ref}
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
