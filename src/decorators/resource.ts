import { isPresent } from '@angular/core/src/facade/lang';

import { Headers, HeadersGetter, headersMetadataKey } from '../headers';

export interface BaseUrlGetter {
    (): string;
}

export interface ResourceConfiguration {
    baseUrl: string | BaseUrlGetter;
    headers?: Headers | HeadersGetter;
}

export const Resource = function (config: ResourceConfiguration): ClassDecorator {
    return function <TFunction extends Function>(constructor: TFunction): void {
        if ('string' === typeof config.baseUrl) {
            constructor.prototype.getBaseUrl = function () {
                return config.baseUrl;
            };
        } else {
            constructor.prototype.getBaseUrl = config.baseUrl;
        }

        if (isPresent(config.headers)) {
            Reflect.defineMetadata(headersMetadataKey, config.headers, constructor);
        }
    };
};
