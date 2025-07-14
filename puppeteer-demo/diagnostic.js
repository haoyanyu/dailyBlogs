const fs = require('fs');
const path = require('path');

// 诊断Puppeteer问题的脚本
async function diagnosePuppeteerIssues() {
  console.log('🔍 开始诊断 Puppeteer 问题...\n');

  // 1. 检查系统信息
  console.log('📋 系统信息:');
  console.log(`  操作系统: ${process.platform}`);
  console.log(`  Node.js 版本: ${process.version}`);
  console.log(`  架构: ${process.arch}\n`);

  // 2. 检查可能的Chrome浏览器路径
  console.log('🔍 检查 Chrome 浏览器路径:');
  const possiblePaths = {
    'darwin': [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    ],
    'win32': [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    ],
    'linux': [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/snap/bin/chromium'
    ]
  };

  const platformPaths = possiblePaths[process.platform] || [];
  let foundPaths = [];

  for (const chromePath of platformPaths) {
    try {
      if (fs.existsSync(chromePath)) {
        console.log(`  ✅ 找到: ${chromePath}`);
        foundPaths.push(chromePath);
      } else {
        console.log(`  ❌ 未找到: ${chromePath}`);
      }
    } catch (error) {
      console.log(`  ❓ 检查失败: ${chromePath} - ${error.message}`);
    }
  }

  if (foundPaths.length === 0) {
    console.log('  ⚠️  未找到任何 Chrome 浏览器！');
  }

  // 3. 检查 puppeteer 包
  console.log('\n📦 检查 Puppeteer 包:');
  try {
    const puppeteer = require('puppeteer-core');
    console.log('  ✅ puppeteer-core 已安装');
  } catch (error) {
    console.log('  ❌ puppeteer-core 未安装或有问题:', error.message);
  }

  // 4. 测试浏览器启动
  console.log('\n🚀 测试浏览器启动:');
  
  if (foundPaths.length > 0) {
    const puppeteer = require('puppeteer-core');
    
    for (const chromePath of foundPaths) {
      console.log(`\n  测试路径: ${chromePath}`);
      
      try {
        const browser = await puppeteer.launch({
          headless: true,
          executablePath: chromePath,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
          ],
          timeout: 30000
        });
        
        console.log('    ✅ 启动成功！');
        
        // 测试创建页面
        const page = await browser.newPage();
        await page.goto('https://www.baidu.com', { timeout: 10000 });
        console.log('    ✅ 页面访问成功！');
        
        await browser.close();
        console.log('    ✅ 浏览器关闭成功！');
        
        console.log(`\n🎉 推荐使用路径: ${chromePath}`);
        break;
        
      } catch (error) {
        console.log(`    ❌ 启动失败: ${error.message}`);
      }
    }
  }

  // 5. 提供解决方案建议
  console.log('\n💡 解决方案建议:');
  
  if (foundPaths.length === 0) {
    console.log('  1. 请安装 Google Chrome 浏览器');
    console.log('  2. 或者安装 Chromium 浏览器');
    console.log('  3. 或者使用 puppeteer (包含 Chromium) 而不是 puppeteer-core');
  } else {
    console.log('  1. 使用找到的浏览器路径');
    console.log('  2. 增加启动超时时间');
    console.log('  3. 添加更多启动参数');
  }
  
  console.log('  4. 检查网络连接');
  console.log('  5. 确保有足够的系统资源');
  console.log('  6. 尝试关闭防火墙或杀毒软件');

  console.log('\n📝 示例修复代码:');
  console.log('```javascript');
  console.log('const browser = await puppeteer.launch({');
  console.log('  headless: true,');
  if (foundPaths.length > 0) {
    console.log(`  executablePath: '${foundPaths[0]}',`);
  }
  console.log('  args: [');
  console.log('    \'--no-sandbox\',');
  console.log('    \'--disable-setuid-sandbox\',');
  console.log('    \'--disable-dev-shm-usage\',');
  console.log('    \'--disable-gpu\'');
  console.log('  ],');
  console.log('  timeout: 60000 // 增加超时时间');
  console.log('});');
  console.log('```');
}

// 运行诊断
if (require.main === module) {
  diagnosePuppeteerIssues().catch(console.error);
}

module.exports = { diagnosePuppeteerIssues }; 