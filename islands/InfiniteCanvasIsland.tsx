import { useRef } from "preact/hooks";
import { Connector } from "../components/Connector.tsx";
import { InfiniteCanvas } from "../components/InfiniteCanvas.tsx";
import { LinkCard } from "../components/LinkCard.tsx";
import { TitleLogo } from "../components/TitleLogo.tsx";

export default function InfiniteCanvasIsland() {
  const title = {
    id: "title",
    ref: useRef<HTMLDivElement>(null),
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
      <div
        id={title.id}
        ref={title.ref}
        style={{
          fontSize: "5rem",
          cursor: "grab",
          position: "absolute",
          left: title.left,
          top: title.top,
        }}
      >
        <TitleLogo />
      </div>

      {subDomains.map((v) => <Connector leftID={v.id} rightID={title.id} />)}
      {subDomains.map(({ id, ref, name, description, left, top }) => (
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
      {subRoutes.map(({ id, ref, path, description, left, top }) => (
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
