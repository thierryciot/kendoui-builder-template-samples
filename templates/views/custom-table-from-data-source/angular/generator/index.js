(function (module) {
    'use strict';

    const stringUtils = require('./string-utils');
    const fs = require('fs');
    const path = require('path');

    const JSTypeMap = {
        'Number': 'number',
        'Integer': 'number',
        'Text': 'string',
        'Date': 'Date',
        'Datetime': 'Date',
        'Boolean': 'boolean',
        'RichText': 'string',
        'Currency': 'number',
        'Email': 'string',
        'PhoneNumber': 'string',
        'URL': 'string',
        'Password': 'string',
        'Photo': 'any',
        'Percent': 'number',
        'PercentValue': 'number',
        'Lookup': 'any'
    };

    const RestJsTypeMap = {
        'string': 'string',
        'number': 'number',
        'boolean': 'boolean',
        'date': 'Date',
        'object': 'any'
    };

    // Only for KUIB V3:
    // we have config metadata for each data provider.
    // For each DS KUIB creates a service with this config.
    // The way to access the configured rest fields is to access the meta file using node js APIs for path and fs
    // (code needs to be synchronous)
    class Generator {
        /*
         * Adds or removes properties from a meta model
         * @param {object} metaModel - The metaModel being processed, this could be either view or ui component.
         * @param {string} metaPath - The path to the folder containing the meta information for the application.
         */
        augmentModel(metaModel, metaPath) {
            const pathToDataProviderFile = path.join(__dirname,'..','..','..','..','..',`./meta/dataProviders/${metaModel.dataProvider}.json`);
            const contents = fs.readFileSync(pathToDataProviderFile);
            const dataProvider = JSON.parse(contents);
            const dataSource = dataProvider.children.find(dataSource => dataSource.name === metaModel.dataSource);
            metaModel.myDataSrcFields = dataSource['fields']; // We give it a very unique name so that it's easy to find in code

            metaModel.viewDataSources = {
                [dataSource.name]: this.getDataSourceContext(dataProvider, dataSource)
            };
        }

        getViewChildComponents(view) {
            return {};
        }

        getDataSourceContext(provider, dataSource) {
            const singularizedDSName = stringUtils.singularize(dataSource.name);

            let dsContext = {
                providerName: provider.name,
                providerType: provider.type,
                dasherizedProviderName: stringUtils.dasherize(provider.name),
                classifiedProviderName: stringUtils.classify(provider.name),
                dasherizedDSName: stringUtils.dasherize(singularizedDSName),
                classifiedDSName: stringUtils.classify(singularizedDSName),
                serverOperations: !dataSource.clientSideProcessing,
                fields: dataSource.fields.map(field => {
                    return {
                        name: field.name,
                        type: this._getFieldType(provider.type, field)
                    };
                }),
                state: { skip: 0 }
            };

            switch (provider.type) {
                case 'odata-provider':
                    dsContext.classifiedServiceFactory = 'ODataServiceFactory';
                    dsContext.camelCasedServiceFactory = 'oDataServiceFactory';
                    dsContext.dasherizedServiceFactory = 'odata-service-factory';
                    dsContext.tableName = dataSource.tableName;
                    dsContext.primaryKeys = this._getPrimaryKeys(dataSource);
                    break;
                case 'progress-data-provider':
                    dsContext.classifiedServiceFactory = 'ProgressServiceFactory';
                    dsContext.camelCasedServiceFactory = 'progressServiceFactory';
                    dsContext.dasherizedServiceFactory = 'progress-service-factory';
                    dsContext.resourceName = dataSource.resourceName;
                    dsContext.tableName = dataSource.tableName;
                    dsContext.countFnName = dataSource.countFnName;
                    break;
                case 'rest-data-provider':
                    dsContext.classifiedServiceFactory = 'RestDataServiceFactory';
                    dsContext.camelCasedServiceFactory = 'restDataServiceFactory';
                    dsContext.dasherizedServiceFactory = 'rest-data-service-factory';
                    dsContext.idField = dataSource.schema.idField;
                    dsContext.dataProperty = dataSource.schema.data;
                    dsContext.totalProperty = dataSource.schema.total;
                    dsContext.actions = this._getRestActions(dataSource.actions);
                    break;
                default:
                    break;
            }

            return dsContext;
        }

        _getPrimaryKeys(dataSource) {
            return dataSource.primaryKeys.map(item => {
                const field = dataSource.fields.find(field => field.name === item);

                if (!field) {
                    throw new Error('Unknown primary key field: ' + item);
                }

                return {
                    name: item,
                    type: this._getFieldType('odata-provider', field)
                };
            });
        }

        _getFieldType(providerType, field) {
            if (providerType === 'rest-data-provider') {
                return RestJsTypeMap[field.fieldType];
            }

            return  field.semanticType ? JSTypeMap[field.semanticType] : 'string';
        }

        _getRestActions(actions) {
            const result = {};

            Object.keys(actions).forEach(key => {
                const action = actions[key];

                if (action.url) {
                    result[key === 'destroy' ? 'remove' : key] = {
                        method: action.method,
                        url: action.url.startsWith('/') || action.url.startsWith('\\') ? action.url.substr(1) : action.url
                    };
                }
            });

            return result;
        }

        getViewChildComponents(view) {
        }

        extendViewContext(context) {
        }
    }

    module.exports = () => {
        return new Generator();
    };
})(module);