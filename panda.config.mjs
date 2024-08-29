import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // preflight: true,
  // minify: true,
  // hash: { "cssVar": false, "className": true },
  include: ["./{components,islands,routes}/**/*.{js,jsx,ts,tsx}"],
  exclude: ["./static"],
  theme: {
    extend: {},
  },
  outdir: "./static/styled-system",
  forceConsistentTypeExtension: true,
  syntax: "template-literal",
  jsxFramework: "preact",
  lightningcss: true,
  globalCss: {
    "html, body": {
      "margin": 0,
      "padding": 0,
    },
  },
});
