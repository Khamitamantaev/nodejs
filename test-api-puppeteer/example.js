const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://ru.investing.com/technical/technical-summary');
  await page.setViewport({width: 800, height: 1200})
  await page.screenshot({path: 'google1.png'});

  await browser.close();
}

getPic();