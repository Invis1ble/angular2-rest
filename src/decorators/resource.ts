import { ClientType } from '../client';
import { Headers, HeadersGetter } from '../headers';

export const resourceMetadataKey = Symbol('rest:resource');

export interface BaseUrlGetter {
    (): string;
}

export interface ResourceConfiguration {
    client?: ClientType;
    baseUrl: string | BaseUrlGetter;
    headers?: Headers | HeadersGetter;
}

export const Resource = function (config: ResourceConfiguration): ClassDecorator {
    return function <TFunction extends Function>(constructor: TFunction): void {
        Reflect.defineMetadata(resourceMetadataKey, config, constructor);
    };
};
