module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  env: {
    es6: true,
    browser: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: 'module',
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react",
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  }
}
