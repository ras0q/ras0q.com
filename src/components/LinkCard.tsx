import { css } from "../styled-system/css/index.mjs";

type Props = {
  title: string;
  body?: string;
  href: string;
};

export const LinkCard = ({ title, body, href }: Props) => {
  return (
    <div
      class={css`
        --border-radius: 10px;

        width: fit-content;
        display: inline-block;
        user-select: none;
        white-space: nowrap;
        cursor: inherit;

        padding: 4px; /* as border width */
        border-radius: var(--border-radius);
        background: transparent;
        &:hover {
          background: linear-gradient(var(--angle), var(--colors-pink), var(--colors-lavender));
          animation: 2s rotate linear infinite;
        }
      `}
      draggable={false}
    >
      <div
        class={css`
          background-color: var(--colors-macchiato-base);
          color: var(--colors-macchiato-text);
          border-radius: var(--border-radius);
          padding: 1.5rem;

          & > * {
            margin: 0;
          }
        `}
      >
        <h2>
          <a
            href={href}
            class={css`color: var(--colors-macchiato-text);`}
          >
            {title}
          </a>
        </h2>
        <p>{body}</p>
      </div>
    </div>
  );
};
