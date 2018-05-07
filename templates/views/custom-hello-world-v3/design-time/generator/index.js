(function(module) {
    'use strict';
    // Right now there is no direct access to the generator output.
    // However, if you start KUIB from the command line, you will be able to see console messages.
    // console.log("Trace: in design time generator" );

    module.exports = {
        augmentModel: function(inMemoryMetaModel, metafolderPath) {
            // Greeting is defined in meta\modules\myModuleName.json
            // We show how we can augment an existing property
            console.log("Trace: in design time generator: inMemoryMetaModel.greeting: " + inMemoryMetaModel.greeting);
            inMemoryMetaModel.greeting = '<i class="fa fa-globe"></i>&nbsp;' + inMemoryMetaModel.greeting;
            console.log("Trace: in design time generator: augmented inMemoryMetaModel.greeting: " + inMemoryMetaModel.greeting);

            // version comes from options and is not yet defined: we should see undefined at console.
            console.log("Trace: in design time generator: inMemoryMetaModel.version: " + inMemoryMetaModel.version);

            // now we add an additional property.
            // inMemoryMetaModel.generatedAt = new Date(2018, 3, 27).toLocaleDateString("en-US");
            inMemoryMetaModel.generatedAt = new Date().toLocaleDateString("en-US");
            console.log("Trace: in design time generator: inMemoryMetaModel.generatedAt: " + inMemoryMetaModel.generatedAt);

            // Ensure html property is always defined to simplify template (when first defining the view
            // the html property will be undefined) - when we add and then delete all content from html editor
            // then the property will be empty.
            console.log("Trace: in design time generator: inMemoryMetaModel.html: " + inMemoryMetaModel.html);
            if ( inMemoryMetaModel.html === undefined )
                inMemoryMetaModel.html = "";

            console.log("Trace: in design time generator: inMemoryMetaModel.html: " + inMemoryMetaModel.html);
        }
    };
})(module);
