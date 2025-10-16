import { Connector } from "./components/Connector.tsx";
import { Draggable } from "./components/Draggable.tsx";
import { GradientText } from "./components/GradientText.tsx";
import { InfiniteCanvas } from "./components/InfiniteCanvas.tsx";
import { Log } from "./components/Log.tsx";
import { SkillsTable } from "./components/SkillsTable.tsx";
import {
  aboutDescription,
  canvasConnections,
  canvasItems,
  careers,
  contests,
  skills,
  talks,
  works,
} from "./consts.ts";
import { css } from "./styled-system/css/css.mjs";
import { cx } from "./styled-system/css/cx.mjs";

const boldItalicStyle = css`
  font-size: 2rem;
  font-style: italic;
  font-weight: 800;
  padding: 0 0.25rem; /* prevent italic text cut */
`;

const LinkOrPlain = ({ link, children }: {
  link?: string;
  children: preact.ComponentChildren;
}) => {
  const isExternal = link !== undefined && !["/", "#", "?"].includes(link[0]);

  return (
    link
      ? (
        <a
          href={link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      )
      : <>{children}</>
  );
};

export function App() {
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
        <InfiniteCanvas centerID="item-0">
          {canvasItems.map((item, i) => (
            <Draggable
              id={`item-${i}`}
              left={item.left}
              top={item.top}
              canDamping
            >
              <LinkOrPlain link={item.link}>
                {item.type === "text"
                  ? (
                    <GradientText
                      class={cx(
                        item.extraClass,
                        boldItalicStyle,
                      )}
                    >
                      {item.text}
                    </GradientText>
                  )
                  : item.type === "image"
                  ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      class={item.extraClass}
                    />
                  )
                  : null}
              </LinkOrPlain>
            </Draggable>
          ))}

          {canvasConnections.map(([left, right]) => (
            <Connector leftID={`item-${left}`} rightID={`item-${right}`} />
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
                </p>
                <p>{aboutDescription}</p>
              </div>
            </section>

            <section id="careers">
              <h2>Careers</h2>
              <div
                class={css`
                  display: grid;
                  grid-row-gap: 1rem;
                `}
              >
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
              <div
                class={css`
                  display: grid;
                  grid-row-gap: 1rem;
                `}
              >
                {talks.map((t) => <Log key={t.title} {...t} />)}
              </div>
            </section>

            <section id="contests">
              <h2>Contests</h2>
              <div
                class={css`
                  display: grid;
                  grid-row-gap: 1rem;
                `}
              >
                {contests.map((c) => <Log key={c.title} {...c} />)}
              </div>
            </section>
          </div>
        </div>

        <section
          id="works"
          class={css`
            grid-gap: inherit;
          `}
        >
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
                <div
                  class={css`
                    display: grid;
                    grid-row-gap: 1rem;
                  `}
                >
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
