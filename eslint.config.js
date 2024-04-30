import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    ignores: [
    "node_modules/*",           // ignore its content
    ".github/workflows/*"
    ]
  },
  {
    rules: {
    "no-console": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {"js": "always"}
  ]
    }
  }
];