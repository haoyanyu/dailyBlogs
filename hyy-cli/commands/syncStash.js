const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const { getWorkspaceRoot, getStagedFiles, commitChanges, addToGit } = require('../utils/git');

/**
 * 从暂存区复制文件到目标目录
 * @param {Object} options 命令选项
 * @param {string} options.target 目标目录
 * @param {string} options.msg 提交信息（可选）
 */
async function syncStash(options) {
  const spinner = ora('开始处理...').start();
  
  try {
    const { target, msg: commitMsg } = options;
    const sourceDir = process.cwd();
    let targetPath = '';
    let targetApplicationName = null;
    
    // 获取工作区根目录
    const workspaceRoot = getWorkspaceRoot();
    spinner.text = `已获取工作区根目录: ${workspaceRoot}`;
    
    // 获取目标目录的绝对路径
    if (!path.isAbsolute(target)) {
      // 如果目标不是绝对路径，假设它相对于工作区根目录
      targetPath = path.resolve(workspaceRoot, '..', target);
      targetApplicationName = target;
    } else {
      // 如果已经是绝对路径，直接使用
      targetPath = target;
    }
    
    // 检查目标目录是否存在
    if (!fs.existsSync(targetPath)) {
      throw new Error(`目标目录 '${targetPath}' 不存在`);
    }
    
    spinner.succeed(`已确认目标目录: ${targetPath}`);
    
    // 输出相关信息
    console.log(chalk.cyan(`源目录: ${sourceDir}`));
    console.log(chalk.cyan(`目标目录: ${targetPath}`));
    console.log(chalk.cyan(`工作区根目录: ${workspaceRoot}`));
    
    // 获取暂存区文件列表
    spinner.text = '获取暂存区文件...';
    const stagedFiles = getStagedFiles();
    spinner.succeed(`已获取 ${stagedFiles.length} 个暂存区文件`);
    
    // 处理每个暂存区文件
    spinner.text = '开始复制文件...';
    
    for (const file of stagedFiles) {
      // 获取源文件路径
      const sourceFile = path.join(workspaceRoot, file);
      
      // 计算目标文件路径
      let targetFile;
      
      if (targetApplicationName) {
        // 提取路径中的第一个目录名称
        const sourceApplicationName = file.split('/')[0];
        
        // 提取路径中除第一个目录外的剩余部分
        const sourceFilePath = file.substring(file.indexOf('/') + 1);
        
        // 构建目标路径
        const relApplicationName = `${targetApplicationName}-ui`;
        const relPath = path.join(relApplicationName, sourceFilePath);
        targetFile = path.join(targetPath, relPath);
      } else {
        // 直接使用文件路径
        targetFile = path.join(targetPath, file);
      }
      
      // 确保目标目录存在
      await fs.ensureDir(path.dirname(targetFile));
      
      // 复制文件
      await fs.copy(sourceFile, targetFile, { overwrite: true });
      console.log(chalk.green(`已复制: ${file} -> ${targetFile}`));
    }
    
    spinner.succeed('文件复制完成');
    
    // 如果提供了提交信息，执行提交操作
    if (commitMsg) {
      spinner.text = '在源仓库提交更改...';
      commitChanges(null, commitMsg);
      spinner.succeed('源仓库提交完成');
      
      spinner.text = '在目标仓库提交更改...';
      addToGit(targetPath);
      commitChanges(targetPath, commitMsg);
      spinner.succeed('目标仓库提交完成');
    }
    
    spinner.succeed(chalk.green('操作成功完成'));
  } catch (error) {
    spinner.fail(chalk.red(`操作失败: ${error.message}`));
    throw error;
  }
}

module.exports = {
  syncStash
};