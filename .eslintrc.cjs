module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "@tanstack/eslint-plugin-query", "prettier"],
  rules: {
    // 'react-refresh/only-export-components': [
    //   'warn',
    //   { allowConstantExport: true },
    // ],
    "jsx-a11y/interactive-supports-focus": [
      "error",
      {
        tabbable: ["button", "checkbox", "link", "textbox", "tree"]
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"]
      }
    ],
    "@tanstack/query/exhaustive-deps": "off",
    "@tanstack/query/prefer-query-object-syntax": "error"
  },
  overrides: [
    {
      files: ["**/*.ts?(x)", "**/*.js?(x)"],
      rules: {
        "prettier/prettier": "error",
        "jsx-quotes": ["error", "prefer-double"],
        "quotes": ["error", "double"],
        "no-console": ["error", { allow: ["warn", "error"] }],
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "jsx-a11y/control-has-associated-label": 0,
        "object-curly-newline": 0,
        "no-param-reassign": "warn",
        "comma-dangle": "off",
        "no-nested-ternary": 0,
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-unused-expressions": [0, { allowShortCircuit: true, allowTernary: true }],
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never"
          }
        ],
        "import/first": "error",
        "import/named": "off",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "import/prefer-default-export": "off",
        "import/no-useless-path-segments": "warn",
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "import/no-unresolved": 0,
        "react/display-name": "off",
        "react/jsx-filename-extension": "off",
        "react/no-children-prop": "off",
        "react/jsx-props-no-spreading": "off",
        "react/no-array-index-key": "off",
        "react/no-unescaped-entities": "off",
        "react/no-unstable-nested-components": ["off" | "warn" | "error", { allowAsProps: true | false }],
        "react/no-this-in-sfc": "off",
        "react/react-in-jsx-scope": "off",
        "react/self-closing-comp": "error",
        "react/function-component-definition": "off",
        "react/prop-types": "off",
        "import/order": 0
      }
    }
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
