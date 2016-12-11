"use strict";
require('reflect-metadata');
exports.buildPathComponentDecorator = function (pathComponentMetadataKey) {
    return function (name) {
        return function (service, methodName, parameterIndex) {
            var pathComponentsMetadata = Reflect.getOwnMetadata(pathComponentMetadataKey, service, methodName) || [];
            var pathComponentMetadata = {
                name: name,
                index: parameterIndex
            };
            pathComponentsMetadata.push(pathComponentMetadata);
            Reflect.defineMetadata(pathComponentMetadataKey, pathComponentsMetadata, service, methodName);
        };
    };
};
//# sourceMappingURL=utils.js.map