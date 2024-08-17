import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      semi: ["error", "always"],
      indent: ["error", 2],
      quotes: ["error", "single"],

      "linebreak-style": ["error", "unix"],
      "comma-dangle": ["error", "always-multiline"],

      "no-unused-vars": ["error"],
      "no-undef": "error",

      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
