import { RestService } from '../rest.service';

import 'reflect-metadata';

export const bodyMetadataKey = Symbol('rest:body');

export interface BodyMetadata {
    index: number;
}

export const Body = function (service: RestService, methodName: string, parameterIndex: number): void {
    const bodyMetadata: BodyMetadata = {
        index: parameterIndex
    };

    Reflect.defineMetadata(bodyMetadataKey, bodyMetadata, service, methodName);
};
