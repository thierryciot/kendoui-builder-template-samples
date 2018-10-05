(function(module) {
    'use strict';

    class Generator {
        /*
        Attach pretty function -> this is used to serialize array
        Pretty comes from https://www.npmjs.com/package/pretty-js
         */
        constructor(mb, pretty) {
            this.pretty = pretty;
        }

        /*
         * Adds or removes properties from a meta model
         * @param {object} metaModel - The metaModel being processed, this could be either view or ui component.
         * @param {string} metaPath - The path to the folder containing the meta information for the application.
         */
        augmentModel(metaModel, metaPath) {
            var myList3 =
                [ { 'id': 1, 'name': 'test 1 (sample data from index.js augmentModel)' }
                , { 'id': 2, 'name': 'test 2' }
                ];

            metaModel.myList3 = myList3;
        }
    }

    module.exports = (mb, pretty) => {
        return new Generator(mb, pretty);
    };

    console.log("Trace: in runtime generator" );
})(module);
