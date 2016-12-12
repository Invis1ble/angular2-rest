import { RestService } from '../rest.service';

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
