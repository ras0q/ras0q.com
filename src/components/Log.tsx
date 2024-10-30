import { css } from "../styled-system/css/index.mjs";

type Props = {
  duration: string;
  title: string;
  link?: string;
  related?: {
    [key: string]: {
      title: string;
      link?: string;
    };
  };
};

const titleClass = css`
  font-weight: 500;
`;

export const Log = ({ duration, title, link, related }: Props) => (
  <div>
    <p class={css`font-size: small;`}>
      {duration}
    </p>
    <div>
      {link
        ? <a class={titleClass} href={link}>{title}</a>
        : <span class={titleClass}>{title}</span>}
      <ul>
        {related &&
          Object.entries(related).map(([k, v]) => (
            <li key={k}>
              {k}: {v.link
                ? <a class={titleClass} href={v.link}>{v.title}</a>
                : <span class={titleClass}>{v.title}</span>}
            </li>
          ))}
      </ul>
    </div>
  </div>
);
