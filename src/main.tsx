import { render } from "preact";
import { App } from "./app.tsx";

import "./index.css";
import "./styled-system/styles.css";

render(<App />, document.getElementById("app") as HTMLElement);

document.querySelectorAll("a").forEach((anchor) => {
  if (new URL(anchor.href).host === document.location.host) return;

  anchor.setAttribute("target", "_blank");
  anchor.setAttribute("rel", "noopener noreferrer");
});
