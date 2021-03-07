const path                                      = require('path');
const {promisify}                               = require('util');
const config                                    = require('config');

const fs                                        = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const FileFinder                                = require('./lib/file-finder');
const ImageGenerator                            = require('./lib/image-generator');

const filefinder = new FileFinder();
const loader                                    = require('./lib/file-loader');
const TemplatePreparer                          = require('./lib/template-preparer');

const puppeteer                                 = require('puppeteer');


(async function () {

    let files = await filefinder.list();

    const templateData = config.templates[0];
    let templateString = await readFile(templateData.template, 'utf8');
    const template = new TemplatePreparer(templateString);

    const rootLocation = 'file://' + path.join(process.cwd(), templateData.template);
    console.log(rootLocation);

    const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions']
    });
  
    promises = new Array();

    await mkdir(config.output, {recursive: true});
    if(config.debug){
        await mkdir('debug', {recursive: true});
    }

    // Build up an array of anonymous function calls to do the processing steps.
    console.log('Loading data');
    files.forEach(file => {
        promises.push((async (filename) => {
            let data = await loader(filename);
            let html = await template.bake(data);

            if(config.debug) {
               await writeFile(path.join(config.debug, `${data.slug}.htm`), html, {encoding: 'utf-8'});
            }
            const page = await browser.newPage();
            await page.goto(rootLocation);
            const generator = new ImageGenerator(page);
            await generator.create(html, {
                outputfile: path.join(config.output, `${data.slug}.png`),
                viewport: {width: templateData.width, height: templateData.height}
            });
        })(file));
    });

    console.log('generating');
    await Promise.all(promises);

    await browser.close();

    console.log('done');
    
})();
