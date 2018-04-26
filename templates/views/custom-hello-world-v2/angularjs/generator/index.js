(function(module) {
    'use strict';
    console.log("Trace: in runtime generator" );

    class Generator {
        constructor(mb, pretty) {
            this.pretty = pretty;
        }

        /*
         * Adds or removes properties from a meta model
         * @param {object} metaModel - The metaModel being processed, this could be either view or ui component.
         * @param {string} metaPath - The path to the folder containing the meta information for the application.
         */
        augmentModel(metaModel, metaPath) {
            var options = {
            };
        }
    }

    module.exports = (mb, pretty) => {
        return new Generator(mb, pretty);
    };

})(module);
