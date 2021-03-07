'use strict'

class ImageGenerator {

    /**
     * 
     * @param {Page} page A puppeteer page instance.
     */
    constructor(page) {
        this.page = page;
    }

    async create(html, options) {
        try {
            await this.page.setViewport(options.viewport);
            await this.page.setContent(html, {timeout: 60000, waitUntil: ['load']});
            await this.page.screenshot({path: options.outputfile, type: 'png', fullPage: false});
        } catch (error) {
            console.error(`Generating '${options.outputfile}': ` + error);
        }

        console.log(options.outputfile);
    }

}

module.exports = ImageGenerator;