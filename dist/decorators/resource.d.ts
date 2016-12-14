import { ClientType } from '../client';
import { Headers, HeadersGetter } from '../headers';
export declare const resourceMetadataKey: symbol;
export interface BaseUrlGetter {
    (): string;
}
export interface ResourceConfiguration {
    client?: ClientType;
    baseUrl: string | BaseUrlGetter;
    headers?: Headers | HeadersGetter;
}
export declare const Resource: (config: ResourceConfiguration) => ClassDecorator;
