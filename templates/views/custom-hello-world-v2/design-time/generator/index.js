(function(module) {
    'use strict';
    console.log("Trace: in design time generator" );

    module.exports = {
        augmentModel: function(metaModel) {
            try {
            }
            catch ( e ) {
                console.log("ERROR in augmentModel" + e );
            }
        }
        // ,
        // getTranslation: function(view) {
        //     try {
        //         console.log( `* In getTranslation for ${view.label}`);
        //     }
        //     catch ( e ) {
        //         console.log("ERROR in getTranslation" + e );
        //     }
        // }
    };
})(module);
