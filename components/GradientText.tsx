import { ComponentChildren } from "preact";
// @ts-types="../static/styled-system/css/index.d.mts"
import { css, cx } from "../static/styled-system/css/index.mjs";

export const GradientText = (
  props: { children: ComponentChildren; class?: string },
) => (
  <span
    class={cx(
      css`
        margin: 0;
        padding: 0 0.25rem; /* prevent text cut */
        user-select: none;
        display: inline-block;
        background: var(--gradients-primary);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      `,
      props.class,
    )}
  >
    {props.children}
  </span>
);
