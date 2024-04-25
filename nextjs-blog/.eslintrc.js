module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended"
  ],
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      "jsx": true
    }
  },
  plugins: [
    "react",
  ],
  rules: {
    'no-unused-vars': 'off',
  }
}
