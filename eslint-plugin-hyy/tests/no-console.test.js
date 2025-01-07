const { RuleTester } = require('eslint');

const rule = require('../lib/rules/no-console');

// eslint9以后，这样写，parserOptions不用显式设置了，测试用例的code自动推断。
const ruleTester = new RuleTester();

ruleTester.run('no-console', rule, {
  valid: [
    'let a = 1;',
    "console.error('error')",
  ],
  invalid: [
    {
      code: "console.log('data')",
      errors: [{ messageId: "avoidConsole" }]
    }
  ]
});
