(function(module) {
    'use strict';

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
            // We augment an existing property
            metaModel.greeting = '<i class="fa fa-globe"></i>&nbsp;' + metaModel.greeting;
            console.log("Trace: in AngularJS generator: metaModel.greeting: " + metaModel.greeting);

            // We add an additional property.
            metaModel.generatedAt = new Date().toLocaleDateString("en-US");
            console.log("Trace: in AngularJS generator: metaModel.generatedAt: " + metaModel.generatedAt);

            // Ensure html property is always defined to simplify template (when first defining the view
            // the html property will be undefined) - when we add and then delete all content from html editor
            // then the property will be empty.
            console.log("Trace: in AngularJS generator: metaModel.html: " + metaModel.html);
            if ( metaModel.html === undefined )
                metaModel.html = "";

            console.log("Trace: in AngularJS generator: metaModel.html: " + metaModel.html);
        }

        getTranslation(view)
        {
            // provide default values for properties
            const translation = {
                label: view.label || view.name,
                title: view.title,
                greeting: view.greeting
            };

            return translation;
        }
    }

    module.exports = (mb, pretty) => {
        return new Generator(mb, pretty);
    };

    console.log("Trace: in runtime generator" );
})(module);
