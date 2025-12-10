import js from "@eslint/js"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import storybook from "eslint-plugin-storybook"
import typescriptEslint from "typescript-eslint"

export default [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      storybook: storybook,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-empty": "off",
      "no-unexpected-multiline": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "off",
      // Warn on any relative imports (./ or ../)
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["./*", "../*"],
              message:
                "Use aliased absolute imports (e.g., '@/...') instead of relative imports.",
            },
          ],
        },
      ],
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: { direct: true },
        },
      ],
    },
  },
  {
    files: ["**/*.stories.{js,jsx,ts,tsx}"],
    rules: {
      ...storybook.configs.recommended.rules,
      "no-restricted-exports": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".cache/**",
      "public/**",
      "static/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
      "**/*.js",
      ".storybook/**",
      "wrap-root-element.tsx",
      "wrap-page-element.tsx",
      "gatsby-ssr.tsx",
      "gatsby-browser.ts",
      "gatsby-node.ts",
      "gatsby-query.ts",
      "gatsby-schema.ts",
      "src/admin/**",
      "src/constants/langs.ts",
    ],
  },
]
