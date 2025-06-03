const { execSync } = require('child_process');

/**
 * 获取 git 仓库根目录
 * @returns {string} git 仓库根目录的绝对路径
 * @throws {Error} 如果当前不在 git 仓库中
 */
function getWorkspaceRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (error) {
    throw new Error('当前不在 git 仓库中');
  }
}

/**
 * 获取暂存区文件列表
 * @returns {string[]} 暂存区文件路径列表
 * @throws {Error} 如果暂存区没有文件
 */
function getStagedFiles() {
  try {
    const result = execSync('git diff --name-only --cached', { encoding: 'utf8' }).trim();
    if (!result) {
      throw new Error('暂存区没有文件。请先使用 git add 添加文件。');
    }
    return result.split('\n').filter(Boolean);
  } catch (error) {
    if (error.message.includes('暂存区没有文件')) {
      throw error;
    }
    throw new Error(`获取暂存区文件失败: ${error.message}`);
  }
}

/**
 * 提交更改
 * @param {string} dir 要提交的目录
 * @param {string} message 提交信息
 */
function commitChanges(dir, message) {
  try {
    const currentDir = process.cwd();
    
    // 如果提供了目录，切换到该目录
    if (dir) {
      process.chdir(dir);
    }
    
    // 提交更改
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
    
    // 切回原目录
    if (dir) {
      process.chdir(currentDir);
    }
    
    return true;
  } catch (error) {
    throw new Error(`提交更改失败: ${error.message}`);
  }
}

/**
 * 将文件添加到 git
 * @param {string} dir 目录
 */
function addToGit(dir) {
  try {
    const currentDir = process.cwd();
    
    // 切换到目标目录
    process.chdir(dir);
    
    // 添加所有更改
    execSync('git add .', { stdio: 'inherit' });
    
    // 切回原目录
    process.chdir(currentDir);
    
    return true;
  } catch (error) {
    throw new Error(`添加文件到 git 失败: ${error.message}`);
  }
}

module.exports = {
  getWorkspaceRoot,
  getStagedFiles,
  commitChanges,
  addToGit
};