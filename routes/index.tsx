import InfiniteCanvasIsland from "../islands/InfiniteCanvasIsland.tsx";
// @ts-types="../static/styled-system/css/index.d.mts"
import { css } from "../static/styled-system/css/css.mjs";

export default function Home() {
  return (
    <main class={css`height: 100svh;`}>
      <InfiniteCanvasIsland />
    </main>
  );
}
