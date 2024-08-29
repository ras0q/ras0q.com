// @ts-types="../static/styled-system/css/index.d.mts"
import { css, cx } from "../static/styled-system/css/index.mjs";

export const TitleLogo = (props: { class?: string }) => (
  <span
    class={cx(
      css`
        font-style: italic;
        font-weight: 800;
        margin: 0;
        padding-right: 0.25rem; /* prevent text cut */
        user-select: none;
        display: inline-block;
        background: linear-gradient(120deg, var(--ctp-latte-lavender), var(--ctp-latte-pink));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      `,
      props.class,
    )}
  >
    ras0q.com
  </span>
);
