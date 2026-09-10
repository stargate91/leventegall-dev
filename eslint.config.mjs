import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import tseslint from "typescript-eslint";
import { createFrontendConfig } from "@stargate91/eslint-config/frontend";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "public/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },

  // Shared Stargate91 frontend configuration (React 19, TS, A11y, Security, Import-X)
  ...createFrontendConfig({
    tsconfigRootDir: import.meta.dirname,
    project: ["./tsconfig.json"],
    i18n: { enabled: false },
    react: {
      allowInlineStyles: true, // my-website uses inline styles for dynamic CSS variables
    },
    rules: {
      // my-website preferences
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "react-refresh/only-export-components": "off",
      "react/hook-use-state": "warn",
      "react/no-array-index-key": "warn",
      "react/jsx-boolean-value": "off",
    },
  }),

  // Node script environment
  {
    files: ["scripts/**/*.{js,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        fetch: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },

  // Project-specific formatting rules (@stylistic)
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: "always" },
      ],
      "@stylistic/indent": ["error", 2, { SwitchCase: 1 }],
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/jsx-curly-spacing": ["error", { when: "never", children: true }],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi", requireLast: true },
          singleline: { delimiter: "semi", requireLast: false },
        },
      ],
    },
  }
);
