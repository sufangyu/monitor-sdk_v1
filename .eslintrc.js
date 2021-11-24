module.exports = {
  "parser": "@typescript-eslint/parser", //定义 ESLint 的解析器
  "extends": [
    "eslint:recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint", "html"],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  // FIX: Unable to resolve path to module "xxx"     import/no-unresolved
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
      },
    }
  },
  "rules": {
    "no-console": "off",
    "linebreak-style": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "class-methods-use-this": "off",
    "func-names": "off",
    "import/prefer-default-export": "off",
    // Fix lerna import package has error: Unable to resolve path to module "xxx"     import/no-unresolved
    "import/no-unresolved": ["error", { "ignore": ["@monitor/core", "@monitor/shared", "@monitor/utils"] }],
    "import/no-extraneous-dependencies": "off",
    "import/extensions": ["error", {
        ".ts": "never",
        ".tsx": "never",
        ".js": "never",
        ".jsx": "never",
      },
    ],
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  }
}
