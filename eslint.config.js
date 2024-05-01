import eslint from '@eslint/js'
import typescriptESLint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  eslint.configs.recommended,
  ...typescriptESLint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    plugins: {
      react: eslintPluginReact,
    },
    rules: {
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    },
  },
  {
    plugins: {
      'react-refresh': eslintPluginReactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  },
  eslintConfigPrettier,
  {
    ignores: ['node_modules/', 'dist', 'pnpm-lock.yaml'],
  },
]
