const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Запуск браузера...');
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Установим размер экрана
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('Переходим на http://localhost:3001...');
    await page.goto('http://localhost:3001', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    console.log('Создаем скриншот...');
    await page.screenshot({ 
      path: '/Users/serjnavigatian/Documents/wugamers/screenshot.png',
      fullPage: true 
    });
    
    console.log('Скриншот сохранен в screenshot.png');
    
    await browser.close();
  } catch (error) {
    console.error('Ошибка:', error.message);
    process.exit(1);
  }
})();