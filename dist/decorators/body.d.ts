import { RestService } from '../rest.service';
export declare const bodyMetadataKey: symbol;
export interface BodyMetadata {
    index: number;
}
export declare const Body: (service: RestService, methodName: string, parameterIndex: number) => void;
