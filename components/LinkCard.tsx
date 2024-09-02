// @ts-types="../static/styled-system/css/index.d.mts"
import { css } from "../static/styled-system/css/index.mjs";

type Props = {
  title: string;
  body?: string;
  href: string;
};

export const LinkCard = ({ title, body, href }: Props) => {
  return (
    <div
      class={css`
        width: fit-content;
        display: inline-block;
        padding: 1.5rem;
        background-color: var(--colors-macchiato-base);
        color: var(--colors-macchiato-text);
        border-radius: 10px;
        user-select: none;
        white-space: nowrap;
        cursor: inherit;
        & > * {
          margin: 0;
        }
      `}
      draggable={false}
    >
      <h2>
        <a
          href={href}
          class={css`
            color: var(--colors-macchiato-text);
          `}
        >
          {title}
        </a>
      </h2>
      <p>{body}</p>
    </div>
  );
};
