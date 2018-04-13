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
            // This is to workaround a bug in kuib V2 where the view label is not included in translation keys
            // we are building a unique key like this modules.HelloWorld.views.HWV1.label
            // provide keys for properties.
            const keyPrefix = `modules.${ metaModel.moduleName }.views.${ metaModel.name }`;
            // metaModel.labelKey = `${keyPrefix}.label`;
            // metaModel.titleKey = `${keyPrefix}.title`;

            // This is how we would provide a translation to view properties
            // metaModel.greetingKey = `${keyPrefix}.greeting`;
        }

        getTranslation(view)
        {
            // provide default values for properties
            const translation = {
                label: view.label || view.name,
                title: view.titleX,
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
