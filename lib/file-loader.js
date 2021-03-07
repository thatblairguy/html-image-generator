'use strict'

const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

/**
 * 
 * @param {string} filename File to 
 */
async function FileLoader(filename) {
    let data = await readFile(filename);
    let json = JSON.parse(data);
    if(!json.slug)
        json.slug = getSlugFromFilename(filename);
    return json;
}

/**
 * Convert a filename with an optional directory path and extension into
 * its corresponding filename slug. (e.g. 'input/data.txt' becomes 'data')
 * 
 * @param {string} filename the filename to convert.
 */
function getSlugFromFilename(filename) {

    // NOTE: +1 takes care of the "not found" case.
    let start = filename.lastIndexOf('/') + 1;
   
    // For end, we need to be a smarter.
    let end = filename.lastIndexOf('.');
    if (end === -1) {
        end = filename.length;
    }

    return filename.substring(start, end);
}

module.exports = FileLoader;