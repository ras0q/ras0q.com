import { useRef } from "preact/hooks";
import { Connector } from "../components/Connector.tsx";
import { Draggable } from "../components/Draggable.tsx";
import { GradientText } from "../components/GradientText.tsx";
import { InfiniteCanvas } from "../components/InfiniteCanvas.tsx";
import { LinkCard } from "../components/LinkCard.tsx";
import { css } from "../styled-system/css/css.mjs";

export default function InfiniteCanvasIsland() {
  const title = {
    id: "title",
    ref: useRef<HTMLDivElement>(null),
    name: "ras0q.com",
    left: 345,
    top: 276,
  };

  const icons = [
    {
      name: "X",
      link: "https://x.com/ras0q",
      path: "/img/x.svg",
      left: 550,
      top: 250,
    },
    {
      name: "GitHub",
      link: "https://github.com/ras0q",
      path: "/img/github.svg",
      left: 600,
      top: 250,
    },
    {
      name: "Bluesky",
      link: "https://bsky.app/ras0q.com",
      path: "/img/bluesky.svg",
      left: 650,
      top: 250,
    },
    {
      name: "Nostr",
      link: "https://njump.me/ras0q.com",
      path: "/img/nostr.svg",
      left: 700,
      top: 250,
    },
  ];

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
      path: "#about",
      left: 850,
      top: 150,
    },
    {
      path: "/works",
      description: "Works",
      left: 900,
      top: 250,
    },
  ].map((v, i) => ({
    id: `subroutes${i}`,
    ref: useRef<HTMLDivElement>(null),
    ...v,
  }));

  return (
    <InfiniteCanvas>
      <Draggable id={title.id} left={title.left} top={title.top} canDamping>
        <GradientText
          class={css`
            font-style: italic;
            font-weight: 800;
            font-size: 5rem;
          `}
        >
          ras0q.com
        </GradientText>
      </Draggable>

      {icons.map(({ name, link, path, left, top }) => (
        <Draggable id={name} left={left} top={top} canDamping>
          <a href={link}>
            <img src={path} alt={name} width="32px" height="32px" />
          </a>
        </Draggable>
      ))}

      {subDomains.map((v) => <Connector leftID={v.id} rightID={title.id} />)}
      {subDomains.map(({ id, name, description, left, top }) => (
        <Draggable id={id} key={name} left={left} top={top} canDamping>
          <LinkCard
            title={name}
            body={description}
            href={`https://${name}${title.name}`}
          />
        </Draggable>
      ))}

      {subRoutes.map((v) => <Connector leftID={title.id} rightID={v.id} />)}
      {subRoutes.map(({ id, path, left, top }) => (
        <Draggable id={id} key={path} left={left} top={top}>
          <a href={path}>
            <GradientText
              class={css`
                font-style: italic;
                font-weight: 800;
                font-size: 2rem;
              `}
            >
              {path}
            </GradientText>
          </a>
        </Draggable>
      ))}
    </InfiniteCanvas>
  );
}
