const puppeteer = require('puppeteer');
const url = 'https://www.instagram.com/accounts/login/'; // login URL;
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3723.0 Safari/537.36';

(async function(){
    const options = process.env.DEBUG
        ? {devtools: true}
        : {};
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
 
    // login page
    await page.goto(url);
    await page.waitForSelector('input[name="username"]');
    await page.type(
        'input[name=username]',
        process.env.USER_NAME
    );
    await page.type(
        'input[name=password]',
        process.env.PASSWORD
    );

    await Promise.all([
        page.waitFor('.XTCLo'), // search form selector in TOP page
        page.click('button[type="submit"]')
    ]);

    await page.waitFor(3000) // sleep 3s
    // TOP page screenshot
    await page.screenshot({path: 'screenshot.png', fullPage: true});

    await browser.close();
})();