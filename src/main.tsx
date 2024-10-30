import { render } from "preact";
import { App } from "./app.tsx";

import "./index.css";
import "./styled-system/styles.css";

render(<App />, document.getElementById("app") as HTMLElement);
