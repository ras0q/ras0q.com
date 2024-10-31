import { GradientText } from "./components/GradientText.tsx";
import { Log } from "./components/Log.tsx";
import { SkillsTable } from "./components/SkillsTable.tsx";
import { careers, contests, skills, talks, works } from "./consts.ts";
import { InfiniteCanvasSection } from "./sections/InfiniteCanvasSection.tsx";
import { css } from "./styled-system/css/css.mjs";

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
        `}
      >
        <InfiniteCanvasSection />
      </section>

      <div
        class={css`
          display: grid;
          grid-row-gap: 2rem;
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
          grid-column-gap: 4rem;
          grid-template-columns: 1fr 1fr;
          @media (max-width: 600px) {
            grid-template-columns: 1fr;
          }
        `}
        >
          <div
            class={css`
            display: grid;
            grid-row-gap: 2rem;
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
                <p>
                  Ras / <GradientText>@ras0q</GradientText>
                </p>
                <p>
                  修士課程 / バックエンドエンジニア / iOSアプリエンジニア
                </p>
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
            grid-row-gap: 2rem;
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

        <section id="works">
          <h2>Works</h2>
          <div
            class={css`
            display: grid;
            grid-column-gap: 4rem;
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
