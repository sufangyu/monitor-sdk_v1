module.exports = {
  "parser": "@typescript-eslint/parser", //定义 ESLint 的解析器
  "extends": [
    "eslint:recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
  ],
  "plugins": ["@typescript-eslint", "html"],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 2015,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  // FIX: Unable to resolve path to module "xxx"     import/no-unresolved
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules": {
    "no-console": "off",
    "linebreak-style": "off",
    "import/prefer-default-export": "off",
    "import/extensions": ["error", {
        ".ts": "never",
        ".tsx": "never",
        ".js": "never",
        ".jsx": "never",
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",

    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  }
}
