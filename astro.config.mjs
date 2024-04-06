import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: ['remark-breaks'],
    extendDefaultPlugins: true,
  },
})
