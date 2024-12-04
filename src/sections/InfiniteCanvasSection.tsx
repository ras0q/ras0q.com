import { Connector } from "../components/Connector.tsx";
import { Draggable } from "../components/Draggable.tsx";
import { GradientText } from "../components/GradientText.tsx";
import { InfiniteCanvas } from "../components/InfiniteCanvas.tsx";
import { css } from "../styled-system/css/css.mjs";
import { icons, subDomains, subRoutes, title } from "../consts.ts";

export const InfiniteCanvasSection = () => {
  const titleID = "title";
  const subdomainIDs = subDomains.map((_, i) => `subdomain_${i}`);
  const subRouteIDs = subRoutes.map((_, i) => `subroutes_${i}`);

  return (
    <InfiniteCanvas centerID={titleID}>
      <Draggable id={titleID} left={title.left} top={title.top} canDamping>
        <GradientText
          class={css`
            font-style: italic;
            font-weight: 800;
            font-size: 5rem;
            padding: 0 0.25rem; /* prevent italic text cut */
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

      {subdomainIDs.map((id) => <Connector leftID={id} rightID={titleID} />)}
      {subDomains.map(({ name, left, top }, i) => (
        <Draggable
          id={subdomainIDs[i]}
          key={name}
          left={left}
          top={top}
          canDamping
        >
          <a href={`https://${name}${title.name}`}>
            <GradientText
              class={css`
                font-style: italic;
                font-weight: 800;
                font-size: 2rem;
                padding: 0 0.25rem; /* prevent italic text cut */
              `}
            >
              {name}
            </GradientText>
          </a>
        </Draggable>
      ))}

      {subRouteIDs.map((id) => <Connector leftID={titleID} rightID={id} />)}
      {subRoutes.map(({ path, left, top }, i) => (
        <Draggable
          id={subRouteIDs[i]}
          key={path}
          left={left}
          top={top}
          canDamping
        >
          <a href={path}>
            <GradientText
              class={css`
                font-style: italic;
                font-weight: 800;
                font-size: 2rem;
                padding: 0 0.25rem; /* prevent italic text cut */
              `}
            >
              {path}
            </GradientText>
          </a>
        </Draggable>
      ))}
    </InfiniteCanvas>
  );
};
