"use strict";
var http_1 = require('@angular/http');
var lang_1 = require('@angular/core/src/facade/lang');
var Observable_1 = require('rxjs/Observable');
require('reflect-metadata');
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var body_1 = require('./body');
var headers_1 = require('../headers');
var method_resolver_1 = require('../method-resolver');
var parameter_1 = require('./parameter');
var path_generator_1 = require('../path-generator');
var query_1 = require('./query');
var appendHeaders = function (service, headers, additionalHeaders) {
    if (!lang_1.isPresent(additionalHeaders)) {
        return;
    }
    if ('function' === typeof additionalHeaders) {
        additionalHeaders = additionalHeaders.call(service);
    }
    for (var name_1 in additionalHeaders) {
        if (additionalHeaders.hasOwnProperty(name_1)) {
            headers.append(name_1, additionalHeaders[name_1]);
        }
    }
};
exports.Action = function (config) {
    return function (service, methodName, descriptor) {
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var client = this.injector.get(config.client || http_1.Http);
            if (!lang_1.isPresent(config.method)) {
                var methodResolver = this.injector.get(method_resolver_1.MethodResolver);
                config.method = methodResolver.resolve(methodName);
            }
            var parametersMetadata = Reflect.getOwnMetadata(parameter_1.parametersMetadataKey, service, methodName);
            if (lang_1.isPresent(parametersMetadata)) {
                var generator = this.injector.get(path_generator_1.PathGenerator);
                config.path = generator.generate(config.path, parametersMetadata, args);
            }
            var headers = new http_1.Headers();
            appendHeaders(service, headers, Reflect.getOwnMetadata(headers_1.headersMetadataKey, service.constructor));
            appendHeaders(service, headers, config.headers);
            var requestOptions = {
                url: this.getBaseUrl() + config.path,
                method: config.method,
                headers: headers
            };
            var queriesMetadata = Reflect.getOwnMetadata(query_1.queriesMetadataKey, service, methodName);
            if (lang_1.isPresent(queriesMetadata)) {
                requestOptions.search = queriesMetadata.reduce(function (search, metadata) {
                    search.set(metadata.name, args[metadata.index]);
                    return search;
                }, new http_1.URLSearchParams());
            }
            var bodyMetadata = Reflect.getOwnMetadata(body_1.bodyMetadataKey, service, methodName);
            if (lang_1.isPresent(bodyMetadata)) {
                requestOptions.body = args[bodyMetadata.index];
                if (lang_1.isPresent(config.requestTransformer)) {
                    var requestTransformer = this.injector.get(config.requestTransformer);
                    requestOptions.body = requestTransformer.transform(requestOptions.body);
                }
            }
            var response = client.request(new http_1.Request(requestOptions));
            if (true !== config.useRawResponse) {
                response = response.map(function (response) { return response.json(); });
            }
            if (!lang_1.isPresent(config.responseTransformer)) {
                return response;
            }
            var responseTransformer = this.injector.get(config.responseTransformer);
            return response.switchMap(function (response) {
                var transformed = responseTransformer.transform(response);
                if (transformed instanceof Observable_1.Observable) {
                    return transformed;
                }
                return Observable_1.Observable.of(transformed);
            });
        };
        return descriptor;
    };
};
//# sourceMappingURL=action.js.map