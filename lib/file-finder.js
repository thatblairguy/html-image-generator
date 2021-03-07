'use strict'

const globby = require('globby');

class FileFinder {

    constructor() {
        this._filespec = "data/*.json";
    }

    async list() {
        let files = await globby(this._filespec);
        return files;
    }

}

module.exports = FileFinder;
