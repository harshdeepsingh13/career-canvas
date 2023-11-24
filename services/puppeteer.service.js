const puppeteer = require("puppeteer");
const fs = require("fs");

exports.generatePDF = async (template) => {
    const browser = await puppeteer.launch({});
    try {
        const page = await browser.newPage();
        await page.setContent(template);

          await page.pdf({
            path: "temp/temp.pdf",
            format: 'letter',
            printBackground: true,
            // displayHeaderFooter: true
        });
        // fs.writeFileSync("public/assets/temp/temp.pdf", pdf, {encoding: "binary", flag: "w"});
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}
