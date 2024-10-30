import { AboutSection } from "./sections/AboutSection.tsx";
import { InfiniteCanvasSection } from "./sections/InfiniteCanvasSection.tsx";
import { WorksSection } from "./sections/WorksSection.tsx";
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

      <section id="about">
        <AboutSection />
      </section>

      <section>
        <WorksSection />
      </section>
    </main>
  );
}
