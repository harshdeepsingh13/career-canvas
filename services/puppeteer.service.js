const puppeteer = require("puppeteer");
const fs = require("fs");
const templateOne = require('../templates/templateOne')

exports.pocFunction = async (template) => {
    const browser = await puppeteer.launch({});
    try {
        const page = await browser.newPage();
        await page.setContent(template);

         await page.pdf({
            path: "temp/temp.pdf",
            format: 'a4',
            printBackground: true,
            displayHeaderFooter: true
        });
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}
