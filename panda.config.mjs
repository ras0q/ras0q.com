import { flavors } from "@catppuccin/palette";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  eject: true,
  // preflight: true,
  minify: true,
  hash: { "cssVar": false, "className": true },
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: ["./public"],
  theme: {
    extend: {
      tokens: {
        colors: {
          "macchiato-base": { value: flavors.macchiato.colors.base.hex },
          "macchiato-text": { value: flavors.macchiato.colors.text.hex },
          ...Object.fromEntries(
            flavors.latte.colorEntries.map((
              [colorName, { hex }],
            ) => [colorName, { value: hex }]),
          ),
        },
        gradients: {
          primary: {
            value: {
              type: "linear",
              placement: "120deg",
              stops: [
                "var(--colors-lavender)",
                "var(--colors-pink)",
              ],
            },
          },
        },
      },
    },
  },
  outdir: "./src/styled-system",
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
