const puppeteer = require('puppeteer-core');

// 获取Chrome浏览器路径的函数
function getChromePath() {
  const platform = process.platform;
  const possiblePaths = {
    'darwin': [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
    ],
    'win32': [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Users\\%USERNAME%\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
    ],
    'linux': [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium'
    ]
  };
  
  return possiblePaths[platform] || ['/usr/bin/google-chrome'];
}

async function debugForecastPage() {
  let browser;
  try {
    console.log('🚀 启动浏览器进行页面结构调试...');
    
    // 简化的启动配置
    browser = await puppeteer.launch({
      headless: false, // 设为false以便观察页面
      executablePath: getChromePath()[0],
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      timeout: 60000
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('📡 访问天气预报页面...');
    await page.goto('https://www.weather.com.cn/forecast/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // 等待页面完全加载
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🔍 分析页面结构...');

    // 获取页面基本信息
    const pageInfo = await page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        bodyText: document.body.textContent.substring(0, 500)
      };
    });

    console.log('📄 页面信息:');
    console.log(`  标题: ${pageInfo.title}`);
    console.log(`  URL: ${pageInfo.url}`);
    console.log(`  页面内容预览: ${pageInfo.bodyText}...`);

    // 查找所有包含"杭州"的元素
    const hangzhouElements = await page.evaluate(() => {
      const results = [];
      const allElements = document.querySelectorAll('*');
      
      allElements.forEach((element, index) => {
        if (element.textContent && element.textContent.includes('杭州')) {
          results.push({
            index: index,
            tagName: element.tagName,
            textContent: element.textContent.trim().substring(0, 100),
            href: element.href || '',
            className: element.className || '',
            id: element.id || ''
          });
        }
      });
      
      return results.slice(0, 10); // 只取前10个结果
    });

    console.log('\n🎯 找到的杭州相关元素:');
    hangzhouElements.forEach((el, i) => {
      console.log(`  ${i + 1}. ${el.tagName} - "${el.textContent}"`);
      if (el.href) console.log(`     链接: ${el.href}`);
      if (el.className) console.log(`     类名: ${el.className}`);
      if (el.id) console.log(`     ID: ${el.id}`);
      console.log('');
    });

    // 查找所有链接
    const allLinks = await page.evaluate(() => {
      const links = document.querySelectorAll('a');
      const results = [];
      
      links.forEach(link => {
        if (link.href && (
          link.href.includes('hangzhou') || 
          link.href.includes('101210101') ||
          link.textContent.includes('杭州')
        )) {
          results.push({
            text: link.textContent.trim(),
            href: link.href,
            className: link.className || '',
            id: link.id || ''
          });
        }
      });
      
      return results;
    });

    console.log('🔗 找到的杭州相关链接:');
    allLinks.forEach((link, i) => {
      console.log(`  ${i + 1}. "${link.text}" -> ${link.href}`);
      if (link.className) console.log(`     类名: ${link.className}`);
      if (link.id) console.log(`     ID: ${link.id}`);
      console.log('');
    });

    // 查找城市列表容器
    const cityContainers = await page.evaluate(() => {
      const possibleSelectors = [
        '.city-list',
        '.forecast-city',
        '.region',
        '.province',
        '[data-region]',
        '.huadong',
        '.east-china'
      ];
      
      const results = [];
      
      possibleSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el.textContent.includes('杭州') || el.textContent.includes('华东')) {
            results.push({
              selector: selector,
              textContent: el.textContent.substring(0, 200),
              className: el.className || '',
              id: el.id || ''
            });
          }
        });
      });
      
      return results;
    });

    console.log('🏙️ 找到的城市容器:');
    cityContainers.forEach((container, i) => {
      console.log(`  ${i + 1}. 选择器: ${container.selector}`);
      console.log(`     内容: ${container.textContent}`);
      console.log(`     类名: ${container.className}`);
      console.log('');
    });

    // 保持浏览器打开10秒以便手动观察
    console.log('⏱️  浏览器将保持打开10秒，您可以手动查看页面结构...');
    await new Promise(resolve => setTimeout(resolve, 10000));

  } catch (error) {
    console.error('❌ 调试过程中出错:', error.message);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔚 浏览器已关闭');
    }
  }
}

// 运行调试
if (require.main === module) {
  debugForecastPage().catch(console.error);
}

module.exports = { debugForecastPage }; 