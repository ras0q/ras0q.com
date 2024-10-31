import { ComponentChildren } from "preact";
import { css, cx } from "../styled-system/css/index.mjs";

export const GradientText = (
  props: { children: ComponentChildren; class?: string },
) => (
  <span
    class={cx(
      css`
        margin: 0;
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
