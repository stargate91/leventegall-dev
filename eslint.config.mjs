import stylistic from "@stylistic/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importX from "eslint-plugin-import-x";
import security from "eslint-plugin-security";
import tseslint from "typescript-eslint";

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
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic": stylistic,
      "jsx-a11y": jsxA11y,
      "import-x": importX,
      security,
    },
    rules: {
      // -------------------------------------------------------------
      // 1. Ultra-Strict TypeScript & Core Logic Rules
      // -------------------------------------------------------------
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-duplicate-imports": "off",
      "no-debugger": "error",
      "no-alert": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "prefer-template": "error",
      "object-shorthand": ["error", "always"],
      "no-unneeded-ternary": "error",
      curly: ["error", "all"],
      "no-lonely-if": "error",
      "prefer-arrow-callback": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",

      // -------------------------------------------------------------
      // 2. Accessibility (WCAG 2.1 / jsx-a11y) Rules
      // -------------------------------------------------------------
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/tabindex-no-positive": "error",

      // -------------------------------------------------------------
      // 3. Module Architecture & Deterministic Import Ordering (import-x)
      // -------------------------------------------------------------
      "import-x/no-duplicates": "error",
      "import-x/no-self-import": "error",
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          "newlines-between": "ignore",
          alphabetize: { order: "ignore" },
        },
      ],

      // -------------------------------------------------------------
      // 4. Security & Vulnerability Auditing (eslint-plugin-security)
      // -------------------------------------------------------------
      "security/detect-possible-timing-attacks": "warn",
      "security/detect-eval-with-expression": "error",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-buffer-noassert": "error",
      "security/detect-unsafe-regex": "error",

      // -------------------------------------------------------------
      // 5. Code Style & Formatting (@stylistic)
      // -------------------------------------------------------------
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
  },
);
