"use strict";
var lang_1 = require('@angular/core/src/facade/lang');
var client_1 = require('../client');
var headers_1 = require('../headers');
exports.Resource = function (config) {
    return function (constructor) {
        if (lang_1.isPresent(config.client)) {
            Reflect.defineMetadata(client_1.clientMetadataKey, config.client, constructor);
        }
        if ('string' === typeof config.baseUrl) {
            constructor.prototype.getBaseUrl = function () {
                return config.baseUrl;
            };
        }
        else {
            constructor.prototype.getBaseUrl = config.baseUrl;
        }
        if (lang_1.isPresent(config.headers)) {
            Reflect.defineMetadata(headers_1.headersMetadataKey, config.headers, constructor);
        }
    };
};
//# sourceMappingURL=resource.js.map