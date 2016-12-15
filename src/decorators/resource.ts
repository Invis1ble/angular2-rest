import { ClientType } from '../client';
import { Headers, HeadersGetter } from '../headers';
import { isPresent } from '@angular/core/src/facade/lang';

export const resourceMetadataKey = Symbol('rest:resource');

export interface BaseUrlGetter {
    (): string;
}

export interface ResourceConfiguration {
    client?: ClientType;
    baseUrl?: string | BaseUrlGetter;
    headers?: Headers | HeadersGetter;
}

export const Resource = function (config: ResourceConfiguration): ClassDecorator {
    return function <TFunction extends Function>(constructor: TFunction): void {
        const parentConfig: ResourceConfiguration = Reflect.getMetadata(resourceMetadataKey, constructor.prototype);

        if (isPresent(parentConfig)) {
            Object.keys(parentConfig).forEach((option: string) => {
                if (!isPresent((<any>config)[option])) {
                    (<any>config)[option] = (<any>parentConfig)[option];
                }
            });
        }

        Reflect.defineMetadata(resourceMetadataKey, config, constructor.prototype);
    };
};
