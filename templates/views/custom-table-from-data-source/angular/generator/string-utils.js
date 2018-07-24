(function(module) {
    const _ = require('lodash');
    _.mixin(require('lodash-inflection'));
    const { pretty } = require('js-object-pretty-print');

    function dasherize(value) {
        return _.kebabCase(value);
    }

    function classify(value) {
        return _.startCase(value).replace(/ /g, '');
    }

    function singularize(value) {
        return _.singularize(value);
    }

    function _pretty(value) {
        return pretty(value).replace(/"/g, '\'');
    }

    module.exports = {
        dasherize,
        classify,
        singularize,
        pretty: _pretty
    };
})(module);