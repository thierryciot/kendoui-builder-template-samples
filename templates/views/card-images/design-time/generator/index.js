(function(module) {
    'use strict';

    const path = require('path');
    const fs = require('fs');

    module.exports = {
        // ++
        // We add the data source fields to the metamodel so they can be used in templates.
        // And we add some sample data.
        // When changing this, restart kuib as things are cached.
        // --
        augmentModel: function(metaModel) {
            console.log(metaModel.dataProvider);
            console.log(metaModel.dataSource);

            // For troubleshooting and debugging, we add various data points to the model in order to output them in template
            metaModel.outputDebugData = true; // When everything works, we can simply turn off debug output with this single flag
            metaModel.dirName = __dirname;
            metaModel.pathToDataProviderFile = "";
            metaModel.pathToCardFile = "";

            // Create list of fields and associated sample data as we will not make a REST call.
            if ( !metaModel.dataProvider || !metaModel.dataSource ) {
                this.createSampleFieldsAndDataWhenNoDataSource(metaModel);
            }
            else {
                this.getFieldsFromDataSource(metaModel);
                this.createSampleDataForEachField(metaModel);
            }

            // ensure this is defined to simplify template
            if ( metaModel.cardsData.fieldsIcon === undefined ) {
                metaModel.cardsData.fieldsIcon = {};
            }

            // this.getCardHtml(metaModel);
        },

        // Create some fake fields and data when there is no data provider or no data source selected yet.
        createSampleFieldsAndDataWhenNoDataSource: function (metaModel) {
            metaModel.myDataSrcFields =
                [{"label": "id", "name": "id"}
                    , {"name": "field1", "label": 'Label 1'}
                    , {"name": "field2", "label": 'Label 2'}
                ];
            metaModel.mySampleData =
                [{'id': 1, 'field1': 'Sample data test 1', 'field2': 12}
                    , {'id': 2, 'field1': 'Sample data test 2', 'field2': 23}
                ];
        },

        getCardHtml: function (metaModel) {
            try {
                metaModel.cardName = ""; // temporary
                // Read card content directly from file system

                // first create path to the file using the selected card name
                // __dirname is the directory name of the current module (See https://nodejs.org/docs/latest/api/modules.html#modules_dirname)
                const cardFileName = `./Card_${metaModel.cardName}.html`;
                const pathToCardFile = path.join(__dirname, cardFileName);

                // For troubleshooting and debugging, we add to model to output value in template
                console.log(pathToCardFile);
                metaModel.pathToCardFile = pathToCardFile;

                // Read the file content and save it
                metaModel.cardHtmlFragment = fs.readFileSync(pathToCardFile);
            }
            catch ( e ) {
                console.log("Error in getCardHtml. "+e);
                metaModel.cardHtmlFragment = "";
            }
        },

        getFieldsFromDataSource: function (metaModel) {
            // Read data source fields from the metadata directly from file system

            // first create path to the file
            // note: index.js is invoked by node, so we have access to all the globals and in particular of interest for us:
            // __dirname is the directory name of the current module (See https://nodejs.org/docs/latest/api/modules.html#modules_dirname)
            const dataProviderFileName = `./meta/dataProviders/${metaModel.dataProvider}.json`;
            const pathToDataProviderFile = path.join(__dirname, '..', '..', '..', '..', '..', dataProviderFileName);

            // For troubleshooting and debugging, we add to model to output value in template
            metaModel.pathToDataProviderFile = pathToDataProviderFile;

            // Read the file and parse it as JSON
            const contents = fs.readFileSync(pathToDataProviderFile);
            const dataProvider = JSON.parse(contents);

            // and accessing from the JSON data,the array of fields for the specific data source
            const dataSource = dataProvider.children.find(dataSource => dataSource.name === metaModel.dataSource);
            metaModel.myDataSrcFields = dataSource['fields']; // We give it a very unique name so that it's easy to find in code

            metaModel.myDataSrcFieldsLabelMap = {};
            metaModel.myDataSrcFields.forEach(field => {
                metaModel.myDataSrcFieldsLabelMap[field.name] = field.label;
            });
        },

        createSampleDataForEachField: function (metaModel) {
            let sampleString = "some string ";
            let sampleNumeric = 1;
            let sampleStringPostFix = 1;
            const sampleData = [];
            for (let j = 0; j < 10; j++) {
                const oneItem = {};
                for (let i = 0; i < metaModel.myDataSrcFields.length; i++) {
                    const oneField = metaModel.myDataSrcFields[i];
                    const fieldType = oneField["fieldType"];
                    let sample;
                    if (fieldType === "number") {
                        sample = sampleNumeric;
                        sampleNumeric++;
                    }
                    else {
                        sample = sampleString + sampleStringPostFix;
                        sampleStringPostFix++;
                    }

                    oneItem[oneField["name"]] = sample;
                }
                sampleData.push(oneItem);
            }

            metaModel.mySampleData = sampleData;
        }
    };
})(module);
