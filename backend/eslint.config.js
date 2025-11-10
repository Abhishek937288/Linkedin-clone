// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";

export default tseslint.config(
  {
    ignores: ["**/*.js"], // ignore compiled JS files
  },
  eslint.configs.recommended, // basic JS rules
  tseslint.configs.strictTypeChecked, // strict TS rules
  tseslint.configs.stylisticTypeChecked, // style rules for TS
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname, // connect ESLint to your tsconfig
      },
    },
  },
  perfectionist.configs["recommended-natural"] // organize imports, etc.
);
