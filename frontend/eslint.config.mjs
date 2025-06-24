// eslint.config.mjs
import js from "@eslint/js";
import * as next from "@next/eslint-plugin-next";
import * as react from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "@next/next": next,
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...(next.configs?.["core-web-vitals"]?.rules || {}),
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  prettier,
];
