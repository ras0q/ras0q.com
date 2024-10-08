import { useRef } from "preact/hooks";
import { Connector } from "../components/Connector.tsx";
import { Draggable } from "../components/Draggable.tsx";
import { InfiniteCanvas } from "../components/InfiniteCanvas.tsx";
import { LinkCard } from "../components/LinkCard.tsx";
import { TitleLogo } from "../components/TitleLogo.tsx";
// @ts-types="../static/styled-system/css/index.d.mts"
import { css } from "../static/styled-system/css/css.mjs";

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
      name: "blog.",
      description: "My Blog",
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
      <Draggable id={title.id} left={title.left} top={title.top}>
        <TitleLogo class={css`font-size: 5rem;`} />
      </Draggable>

      {subDomains.map((v) => <Connector leftID={v.id} rightID={title.id} />)}
      {subDomains.map(({ id, name, description, left, top }) => (
        <Draggable id={id} key={name} left={left} top={top}>
          <LinkCard
            title={name}
            body={description}
            href={`https://${name}${title.name}`}
          />
        </Draggable>
      ))}

      {subRoutes.map((v) => <Connector leftID={title.id} rightID={v.id} />)}
      {subRoutes.map(({ id, path, description, left, top }) => (
        <Draggable id={id} key={path} left={left} top={top}>
          <LinkCard
            title={path}
            body={description}
            href={path}
          />
        </Draggable>
      ))}
    </InfiniteCanvas>
  );
}
