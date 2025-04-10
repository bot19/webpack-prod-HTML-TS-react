import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    files: ["**/src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ...tseslint.configs.recommended[0],
    rules: {
      ...tseslint.configs.recommended[1].rules,
      ...tseslint.configs.recommended[2].rules,
    },
  },
  {
    files: ["**/src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "module" },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Automatically detect React version
        // Or specify a version like: version: "18.2.0"
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...jsxA11y.flatConfigs.recommended,
  },
]);
