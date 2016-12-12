"use strict";
exports.bodyMetadataKey = Symbol('rest:body');
exports.Body = function (service, methodName, parameterIndex) {
    var bodyMetadata = {
        index: parameterIndex
    };
    Reflect.defineMetadata(exports.bodyMetadataKey, bodyMetadata, service, methodName);
};
//# sourceMappingURL=body.js.map