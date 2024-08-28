export const TitleLogo = () => (
  <span
    style={{
      fontStyle: "italic",
      fontWeight: "800",
      margin: 0,
      paddingRight: "0.25rem", // prevent text cut
      userSelect: "none",
      display: "inline-block",
      background:
        "linear-gradient(120deg, var(--ctp-latte-lavender), var(--ctp-latte-pink))",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    ras0q.com
  </span>
);
