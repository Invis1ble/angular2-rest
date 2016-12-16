"use strict";
var lang_1 = require('@angular/core/src/facade/lang');
exports.resourceMetadataKey = Symbol('rest:resource');
exports.Resource = function (config) {
    return function (constructor) {
        var parentConfig = Reflect.getMetadata(exports.resourceMetadataKey, constructor.prototype);
        if (lang_1.isPresent(parentConfig)) {
            Object.keys(parentConfig).forEach(function (option) {
                if (!lang_1.isPresent(config[option])) {
                    config[option] = parentConfig[option];
                }
            });
        }
        Reflect.defineMetadata(exports.resourceMetadataKey, config, constructor.prototype);
    };
};
//# sourceMappingURL=resource.js.map