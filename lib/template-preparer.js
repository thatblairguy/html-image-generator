'use strict'

const handlebars = require('handlebars');

class TemplatePreparer {

    constructor(template) {
        this.template = handlebars.compile(template);
    }

    async bake(jsonData) {
        return this.template(jsonData);
    }

}

module.exports = TemplatePreparer;