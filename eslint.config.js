import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
  /* ================= 글로벌 ignore ================= */
  globalIgnores(['dist', 'node_modules']),

  {
    /* ================= JS / JSX 공통 ================= */
    files: ['**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      importPlugin.flatConfigs.recommended,
      eslintConfigPrettier,
    ],

    plugins: {
      react,
      prettier: prettierPlugin,
      '@stylistic': stylistic,
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json', '.svg'],
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.json', '.svg'],
        },
      },
    },

    rules: {
      /* ===== Prettier ===== */
      'prettier/prettier': [
        'error',
        {
          bracketSpacing: true,
          endOfLine: 'lf',
          htmlWhitespaceSensitivity: 'css',
          singleAttributePerLine: false,
          bracketSameLine: false,
          printWidth: 80,
          proseWrap: 'preserve',
          quoteProps: 'as-needed',
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
          embeddedLanguageFormatting: 'auto',
        },
      ],

      /* ===== 스타일 ===== */
      '@stylistic/semi': ['error', 'always'],

      /* ===== JSX unused-vars 문제 해결 핵심 ===== */
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',

      /* ===== 기본 규칙 ===== */
      'no-unused-vars': 'warn',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',

      'import/no-unresolved': ['error', { ignore: ['\\.svg\\?react$'] }],

      /* ===== import 정렬 ===== */
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: [],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
  },
]);
