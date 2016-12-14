"use strict";
exports.resourceMetadataKey = Symbol('rest:resource');
exports.Resource = function (config) {
    return function (constructor) {
        Reflect.defineMetadata(exports.resourceMetadataKey, config, constructor);
    };
};
//# sourceMappingURL=resource.js.map