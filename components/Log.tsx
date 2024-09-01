// @ts-types="../static/styled-system/css/index.d.mts"
import { css } from "../static/styled-system/css/index.mjs";

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

export const Log = ({ duration, title, link, related }: Props) => (
  <div>
    <p class={css`font-size: small;`}>
      {duration}
    </p>
    <p>
      {title}
      {link && <a href={link}>↗</a>}
      <ul>
        {related &&
          Object.entries(related).map(([k, v]) => (
            <li>
              {k}: {v.title}
              {v.link && <a href={v.link}>↗</a>}
            </li>
          ))}
      </ul>
    </p>
  </div>
);
