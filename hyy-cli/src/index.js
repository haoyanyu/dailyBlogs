#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { syncStash } = require('./commands/syncStash');

// 版本信息
program.version('1.0.0', '-v, --version', '输出当前版本');

// sync_stash 命令
program
  .command('sync-stash')
  .description('从 git 暂存区复制文件到目标目录')
  .requiredOption('--target <dir>', '指定目标目录路径')
  .option('--msg <message>', '提交信息（可选）')
  .action(async (options) => {
    try {
      await syncStash(options);
    } catch (error) {
      console.error(chalk.red(`错误: ${error.message}`));
      process.exit(1);
    }
  });

// 帮助信息
program.on('--help', () => {
  console.log('');
  console.log('示例:');
  console.log('  $ hyy sync-stash --target=test-front --msg="我的修改"');
});

// 处理未知命令
program.on('command:*', () => {
  console.error(chalk.red(`未知命令: ${program.args.join(' ')}`));
  console.log('运行 hyy --help 查看可用命令');
  process.exit(1);
});

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供参数，显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}