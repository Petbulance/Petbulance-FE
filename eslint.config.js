import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),

  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      importPlugin.flatConfigs.recommended,
      eslintConfigPrettier,
    ],

    plugins: {
      prettier: prettierPlugin,
      "@stylistic": stylistic,
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".json"],
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx", ".json"],
        },
      },
    },

    rules: {
      // Prettier 규칙 위반을 ESLint 에러로
      "prettier/prettier": [
        "error",
        {
          bracketSpacing: true,
          endOfLine: "lf",
          htmlWhitespaceSensitivity: "css",
          singleAttributePerLine: false,
          bracketSameLine: false,
          printWidth: 80,
          proseWrap: "preserve",
          quoteProps: "as-needed",
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: "es5",
          useTabs: false,
          embeddedLanguageFormatting: "auto",
        },
      ],

      // ✅ 세미콜론 누락 시 무조건 에러 (stylistic)
      "@stylistic/semi": ["error", "always"],

      "no-unused-vars": "warn",
      "import/no-dynamic-require": "warn",
      "import/no-nodejs-modules": "warn",

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [{ pattern: "@/**", group: "internal" }],
          pathGroupsExcludedImportTypes: [],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
  },
]);
