const hyyPlugin = require('./index');

module.exports = {
  // eslint9开始plugins不支持数组，需要这样写
  plugins: {
    'eslint-plugin-hyy': hyyPlugin,
  },
  rules: {
    'eslint-plugin-hyy/no-console': 'error'
  }
}