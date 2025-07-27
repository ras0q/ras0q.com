import { css } from "../styled-system/css/index.mjs";
import { GradientText } from "./GradientText.tsx";

type Props = {
  duration: string;
  title: string;
  link?: string;
  subtitle?: string;
  related?: {
    [key: string]: string;
  };
};

const titleClass = css`
  font-size: x-large;
`;

export const Log = ({ duration, title, link, subtitle, related }: Props) => (
  <div>
    {duration.endsWith("now")
      ? (
        <GradientText
          class={css`
            font-weight: 500;
          `}
        >
          {duration}
        </GradientText>
      )
      : <p>{duration}</p>}
    <div>
      {link
        ? <a class={titleClass} href={link}>{title}</a>
        : <p class={titleClass}>{title}</p>}
      {subtitle && (
        <p
          class={css`
            font-size: large;
            white-space: pre-wrap;
          `}
        >
          {subtitle}
        </p>
      )}
      {related && (
        <div
          class={css`
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            padding-top: 0.5rem;
          `}
        >
          {Object.entries(related).map(([kind, link]) => (
            <a
              href={link}
              class={css`
                padding: 0.125rem 0.5rem;
                border-radius: 8px;
                font-weight: 500;
                border: solid 2px var(--colors-sapphire);
              `}
            >
              {kind}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);
