// modules.exports = {
//   mainRoute: true,
//   env: { browser: true, es2020: true },
//   extends: ["plugin:@typescript-eslint/recommended"],
//   ignorePatterns: ["dist", ".eslintrc.cjs"],
//   parser: "@typescript-eslint/parser",
//   plugins: ["@typescript-eslint"],
// };
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-param-reassign": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "import/extensions": "off",
    "import/no-absolute-path" :"off",
    "@typescript-eslint/lines-between-class-members":"off",
    "max-len": ["error", { code: 500 }],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["vite.config.ts"] },
    ],
    "@typescript-eslint/no-use-before-define": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off",
    "no-underscore-dangle": ["error", { "allow": ["_columns"] }],
    "@typescript-eslint/no-shadow": "off",
    "@ts-expect-error": "off"
  },
};
