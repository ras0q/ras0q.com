import deno from "@deno/vite-plugin";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), preact()],
});
