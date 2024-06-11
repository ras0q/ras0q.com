import { RefObject } from "preact";

type Props = {
  divRef: RefObject<HTMLDivElement>;
  title: string;
  body?: string;
  href: string;
};

export const LinkCard = ({ divRef: divRef, title, body, href }: Props) => {
  return (
    <div
      style={{
        width: "fit-content",
        display: "inline-block",
        padding: "1.5rem",
        backgroundColor: "var(--ctp-macchiato-base)",
        color: "var(--ctp-macchiato-text)",
        borderRadius: "10px",
        userSelect: "none",
        whiteSpace: "nowrap",
        cursor: "inherit",
      }}
      ref={divRef}
      draggable={false}
    >
      <h2>
        <a
          href={href}
          style={{
            color: "var(--ctp-macchiato-text)",
          }}
        >
          {title} →
        </a>
      </h2>
      <p>{body}</p>
    </div>
  );
};
