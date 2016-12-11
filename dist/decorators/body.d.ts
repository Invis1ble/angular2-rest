import { RestService } from '../rest.service';
import 'reflect-metadata';
export declare const bodyMetadataKey: symbol;
export interface BodyMetadata {
    index: number;
}
export declare const Body: (service: RestService, methodName: string, parameterIndex: number) => void;
