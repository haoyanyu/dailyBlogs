// module.exports一个对象
module.exports = {
  // 必须的配置
  meta: {
    type: 'suggestion', // 规则类型： problem -> 问题规则； suggestion -> 改进建议；layout -> 格式问题，空格、逗号等
    docs: {
      description: '',
      recommended: false, // 是否作为eslint的核心规则，在使用 eslint:recommended 配置时会自动启用
      url: '', // 规则的详细介绍
    },
    fixable: null, // 是否可修复规则；code可修复代码，whitespace可修复空格
    schema: [], // object|[]|false;
    messages: {
      avoidConsole: "Avoid using console.log statements in the code.",
    },
  },
  // 返回一个对象，包含eslint在遍历语法树ast时调用的方法
  // context: 上下文对象；
  create(context){
    return {
      // key是节点类型或选择器： 在沿着树向下移动时调用
      // key是节点类型或选择器 + :exit时：在沿着树向上移动时调用
      // key是事件名称：会用该方法进行代码路径解析
      CallExpression(node) {
        if(node.callee.type === 'MemberExpression' && node.callee.object.name === "console" && node.callee.property.name === "log") {
          // 报告问题
          context.report({
            node, // 可选参数，用于定位问题位置; node和loc至少要指定一个
            // loc: {
            //   start: {
            //     line: 1,
            //     column: 2,
            //   },
            //   end: {
            //     line: 1,
            //     column: 2,
            //   }
            // },
            messageId: 'avoidConsole', // 使用 meta.messages 的键；也可以用message代替，直接指定提示文案
            // 指定修复方法，设置了meta.fixable时，需要提供fix方法，否则会报错
            // fix(fixer) {
            //   // fixer有一些内置方法；
            //   return fixer.insertTextAfter(node, ';');
            // },
          })
        }
      },
    }
  }
}