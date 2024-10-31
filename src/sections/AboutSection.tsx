import { Log } from "../components/Log.tsx";
import { SkillsTable } from "../components/SkillsTable.tsx";
import { careers, contests, skills, talks } from "../consts.ts";
import { css } from "../styled-system/css/css.mjs";

export const AboutSection = () => (
  <div
    class={css`
      display: grid;
      grid-template-areas:
        "profile profile"
        "careers skills"
        "careers talks"
        "careers contests";
      grid-gap: 4rem 2rem;
      grid-template-columns: 1fr 1fr;
      @media (max-width: 600px) {
        grid-template-areas:
          "profile"
          "careers"
          "skills"
          "contests"
          "talks";
        grid-template-columns: 1fr;
      }
      padding: 5% 10%;
      & * {
        margin: 0;
      }
    `}
  >
    <h1 class={css`grid-area: profile; text-align: center;`}>
      Ras / <code>@ras0q</code>
    </h1>

    <div class={css`grid-area: skills; margin: 0 auto;`}>
      <h2 class={css`text-align: center;`}>Skills</h2>
      <SkillsTable skills={skills} />
    </div>

    <div class={css`grid-area: careers; margin: 0 auto;`}>
      <h2 class={css`text-align: center;`}>Careers</h2>
      <div class={css`display: grid; grid-row-gap: 1rem;`}>
        {careers.map((c) => <Log key={c.title} {...c} />)}
      </div>
    </div>

    <div class={css`grid-area: talks; margin: 0 auto;`}>
      <h2 class={css`text-align: center;`}>Talks</h2>
      <div class={css`display: grid; grid-row-gap: 1rem;`}>
        {talks.map((t) => <Log key={t.title} {...t} />)}
      </div>
    </div>

    <div class={css`grid-area: contests; margin: 0 auto;`}>
      <h2 class={css`text-align: center;`}>Contests</h2>
      <div class={css`display: grid; grid-row-gap: 1rem;`}>
        {contests.map((c) => <Log key={c.title} {...c} />)}
      </div>
    </div>
  </div>
);
