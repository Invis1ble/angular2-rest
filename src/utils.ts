import { PathComponentMetadata, PathComponentsMetadata } from './path-component';
import { RestService } from './rest.service';

export const buildPathComponentDecorator = function <M extends PathComponentMetadata, C extends PathComponentsMetadata<M>>(pathComponentMetadataKey: symbol): (name: string) => ParameterDecorator {
    return function (name: string): ParameterDecorator {
        return function (service: RestService, methodName: string, parameterIndex: number): void {
            const pathComponentsMetadata: C = Reflect.getOwnMetadata(pathComponentMetadataKey, service, methodName) || [];

            const pathComponentMetadata: PathComponentMetadata = {
                name: name,
                index: parameterIndex
            };

            pathComponentsMetadata.push(<M>pathComponentMetadata);
            Reflect.defineMetadata(pathComponentMetadataKey, pathComponentsMetadata, service, methodName);
        };
    };
};
