import { Connector } from "./components/Connector.tsx";
import { Draggable } from "./components/Draggable.tsx";
import { GradientText } from "./components/GradientText.tsx";
import { InfiniteCanvas } from "./components/InfiniteCanvas.tsx";
import { Log } from "./components/Log.tsx";
import { SkillsTable } from "./components/SkillsTable.tsx";
import {
  aboutDescription,
  careers,
  contests,
  icons,
  skills,
  subDomains,
  subRoutes,
  talks,
  title,
  works,
} from "./consts.ts";
import { css } from "./styled-system/css/css.mjs";
import { cx } from "./styled-system/css/cx.mjs";

const boldItalicStyle = css`
  font-style: italic;
  font-weight: 800;
  padding: 0 0.25rem; /* prevent italic text cut */
`;

export function App() {
  const titleID = "title";
  const subdomainIDs = subDomains.map((_, i) => `subdomain_${i}`);
  const subRouteIDs = subRoutes.map((_, i) => `subroutes_${i}`);

  return (
    <main>
      <section
        id="top"
        class={css`
          height: 100svh;
          @media (max-width: 600px) {
            height: 60svh;
          }

          mask-image: linear-gradient(to bottom, black 80%, transparent);
        `}
      >
        <InfiniteCanvas centerID={titleID}>
          <Draggable id={titleID} left={title.left} top={title.top} canDamping>
            <GradientText class={cx(boldItalicStyle, css`font-size: 5rem;`)}>
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

          {subdomainIDs.map((id) => (
            <Connector
              leftID={id}
              rightID={titleID}
            />
          ))}
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
                  class={cx(boldItalicStyle, css`font-size: 2rem;`)}
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
                  class={cx(boldItalicStyle, css`font-size: 2rem;`)}
                >
                  {path}
                </GradientText>
              </a>
            </Draggable>
          ))}
        </InfiniteCanvas>
      </section>

      <div
        class={css`
          display: grid;
          grid-row-gap: 2rem;
          grid-column-gap: 4rem;
          padding: 5% 10%;

          h2 {
            font-size: xx-large;
            margin-bottom: 1rem;
          }

          h3 {
            font-size: x-large;
            margin-bottom: 0.5rem;
          }
        `}
      >
        <div
          class={css`
          display: grid;
          grid-gap: inherit;
          align-items: start;
          grid-template-columns: 1fr 1fr;
          @media (max-width: 600px) {
            grid-template-columns: 1fr;
          }
        `}
        >
          <div
            class={css`
            display: grid;
            grid-gap: inherit;
          `}
          >
            <section id="about">
              <h2>About</h2>
              <div
                class={css`
                display: grid;
                grid-row-gap: 0.5rem;
                font-size: large;
              `}
              >
                <p
                  class={css`
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;

                    & a img {
                      vertical-align: middle;
                    }
                  `}
                >
                  Ras / <GradientText>@ras0q</GradientText>
                  {icons.map(({ name, link, path }) => (
                    <a href={link}>
                      <img src={path} alt={name} width="16px" height="16px" />
                    </a>
                  ))}
                </p>
                <p>{aboutDescription}</p>
              </div>
            </section>

            <section id="careers">
              <h2>Careers</h2>
              <div class={css`display: grid; grid-row-gap: 1rem;`}>
                {careers.map((c) => <Log key={c.title} {...c} />)}
              </div>
            </section>
          </div>

          <div
            class={css`
            display: grid;
            grid-gap: inherit;
          `}
          >
            <section id="skills">
              <h2>Skills</h2>
              <SkillsTable skills={skills} />
            </section>

            <section id="talks">
              <h2>Talks</h2>
              <div class={css`display: grid; grid-row-gap: 1rem;`}>
                {talks.map((t) => <Log key={t.title} {...t} />)}
              </div>
            </section>

            <section id="contests">
              <h2>Contests</h2>
              <div class={css`display: grid; grid-row-gap: 1rem;`}>
                {contests.map((c) => <Log key={c.title} {...c} />)}
              </div>
            </section>
          </div>
        </div>

        <section id="works" class={css`grid-gap: inherit;`}>
          <h2>Works</h2>
          <div
            class={css`
            display: grid;
            grid-gap: inherit;
            grid-template-columns: 1fr 1fr;
            @media (max-width: 600px) {
              grid-template-columns: 1fr;
            }

            h2 {
              font-size: xx-large;
              margin-bottom: 1rem;
            }
          `}
          >
            {Object.entries(works).map(([section, projects]) => (
              <section key={section}>
                <h3>{section}</h3>
                <div class={css`display: grid; grid-row-gap: 1rem;`}>
                  {projects.map((project, index) => (
                    <Log
                      key={index}
                      {...project}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
