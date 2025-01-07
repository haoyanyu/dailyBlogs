module.exports = {
  // 
  // meta: {
  //   // 此处的name需要与包名一致
  //   name: 'eslint-plugin-hyy',
  //   version: '',
  // },
  // 导出规则集对象，每个规则名对应具体的处理方法；rules是必须的。
  rules: {
    'no-console': require('./lib/rules/no-console'),
  },
  configs: {},
  // 插件中的处理器
  processors: {}, 
};