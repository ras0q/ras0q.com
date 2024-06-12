import { style } from "@vanilla-extract/css"

export const linkCard = style({
  width: "fit-content",
  display: "inline-block",
  padding: "1.5rem",
  backgroundColor: "var(--ctp-macchiato-base)",
  color: "var(--ctp-macchiato-text)",
  borderRadius: "10px",
  userSelect: "none",
  whiteSpace: "nowrap",
  cursor: "inherit",
})
