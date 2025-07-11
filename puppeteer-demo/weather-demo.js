const puppeteer = require('puppeteer-core');

// 获取Chrome浏览器路径的函数
function getChromePath() {
  const platform = process.platform;
  const possiblePaths = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    ],
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Users\\%USERNAME%\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    ],
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
    ],
  };

  return possiblePaths[platform] || ['/usr/bin/google-chrome'];
}

async function getHangzhouWeather() {
  let browser;
  try {
    console.log('正在启动浏览器...');

    // 尝试不同的启动配置
    const launchConfigs = [
      // 配置1: 标准配置
      {
        headless: true,
        executablePath: getChromePath()[0],
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--remote-debugging-port=9222',
          // '--window-size=1920,1080',
        ],
        timeout: 60000,
      },
      // 配置2: 无可执行路径配置（使用系统默认）
      {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        timeout: 60000,
      },
      // 配置3: 简化配置
      {
        headless: 'new',
        args: ['--no-sandbox'],
        timeout: 60000,
      },
    ];

    let lastError;
    for (let i = 0; i < launchConfigs.length; i++) {
      try {
        console.log(`尝试启动配置 ${i + 1}...`);
        browser = await puppeteer.launch(launchConfigs[i]);
        console.log('浏览器启动成功！');
        break;
      } catch (error) {
        console.log(`配置 ${i + 1} 失败:`, error.message);
        lastError = error;
        if (browser) {
          await browser.close();
          browser = null;
        }
      }
    }

    if (!browser) {
      throw new Error(
        `所有浏览器启动配置都失败了。最后一个错误: ${lastError.message}`,
      );
    }

    // 创建新页面
    const page = await browser.newPage();

    // 设置用户代理
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );

    // 设置页面视口
    await page.setViewport({ width: 1920, height: 1080 });

    // 访问天气预报首页
    await page.goto('https://www.weather.com.cn/forecast/', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    console.log('成功访问天气预报页面');

    // 等待页面加载完成
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('寻找杭州城市链接...');

    const frameElement = await page.$('iframe');
    if (!frameElement) return;
    const frame = await frameElement.contentFrame();
    await frame.waitForSelector('.zoomIn', { timeout: 5000 });
    const zoomInBtn = await frame.$('.zoomIn');
    await zoomInBtn.click();

    // 找到杭州的图标，点击
    await frame.waitForSelector('label.BMapLabel', { timeout: 10000 });
    const hangzhouLabelClicked = await frame.evaluate(() => {
      const labels = document.querySelectorAll('label.BMapLabel');
      for (let label of labels) {
        if (label.textContent.includes('杭州')) {
          label.click();
          return label.textContent;
        }
      }
      return false;
    });

    console.log('>>>hangzhouLabelClicked', hangzhouLabelClicked)

    if (hangzhouLabelClicked) {
      // 需要加一下等待加载，确保能找到元素
      await frame.waitForSelector('.focShowBox', { timeout: 10000 });
      const hangzhouUrl = await frame.evaluate(() => {
        const boxes = document.querySelectorAll('.focShowBox');
        for (let box of boxes) {
          if (box.textContent.includes('杭州')) {
            // 找到box中的a标签，点击
            const a = box.querySelector('a');
            if (a) {
              return a.href;
            }
          }
        }
        return false;
      });
      console.log('>>>hangzhouUrl', hangzhouUrl)
      if (hangzhouUrl) {
        console.log('成功获取到杭州的链接，等待页面跳转...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await page.goto(hangzhouUrl, {
          waitUntil: 'networkidle2',
          timeout: 30000
        });
        console.log('成功访问杭州天气页面');
        // await page.screenshot({ path: 'screenshot/hangzhou.png', fullPage: true });
        console.log('正在解析杭州天气数据...');
        const weatherInfo = await getHangzhouTodayWeather(page);
        return weatherInfo;
      } else {
        console.log('未找到杭州链接，尝试直接访问杭州天气页面...');
      }
    }

    async function getHangzhouTodayWeather(page) {
      await page.waitForSelector('#today #hidden_title');
      const hiddenTitle = await page.evaluate(() => {
        const todayWeather = document.querySelector('#today #hidden_title');
        return todayWeather.value;
      });
      console.log('>>>hiddenTitle', hiddenTitle)
      return hiddenTitle;
    }
    

    // 输出天气信息
    // console.log('\n=== 杭州天气信息 ===');
    // console.log(`城市: ${weatherInfo.city}`);
    // console.log(`当前温度: ${weatherInfo.currentTemp || '获取失败'}`);
    // console.log(`当前天气: ${weatherInfo.currentWeather || '获取失败'}`);

    // if (weatherInfo.updateTime) {
    //   console.log(`更新时间: ${weatherInfo.updateTime}`);
    // }

    // if (weatherInfo.todayWeather.length > 0) {
    //   console.log('\n今日详细天气:');
    //   weatherInfo.todayWeather.forEach(item => {
    //     console.log(`  ${item.time}: ${item.weather} ${item.temperature}`);
    //   });
    // }

    // if (weatherInfo.forecast.length > 0) {
    //   console.log('\n未来天气预报:');
    //   weatherInfo.forecast.forEach(item => {
    //     console.log(`  ${item.date}: ${item.weather} ${item.temperature}`);
    //   });
    // }

    // // 如果没有获取到主要信息，尝试备用方案
    // if (!weatherInfo.currentTemp && !weatherInfo.currentWeather) {
    //   console.log('\n主要信息获取失败，尝试备用方案...');
    //   throw new Error('主要天气信息获取失败');
    // }
  } catch (error) {
    console.error('获取天气信息时出错:', error.message);
  } finally {
    if (browser) {
      await browser.close();
      console.log('\n浏览器已关闭');
    }
  }
}

// 运行函数
if (require.main === module) {
  getHangzhouWeather().catch(console.error);
}

module.exports = { getHangzhouWeather };
