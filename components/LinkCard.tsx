type Props = {
  title: string;
  body?: string;
  href: string;
};

export const LinkCard = ({ title, body, href }: Props) => {
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
      draggable={false}
    >
      <h2 style={{ margin: 0 }}>
        <a
          href={href}
          style={{
            color: "var(--ctp-macchiato-text)",
          }}
        >
          {title}
        </a>
      </h2>
      <p style={{ margin: 0 }}>{body}</p>
    </div>
  );
};
