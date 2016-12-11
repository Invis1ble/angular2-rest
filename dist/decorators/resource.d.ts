import 'reflect-metadata';
import { Headers, HeadersGetter } from '../headers';
export interface BaseUrlGetter {
    (): string;
}
export interface ResourceConfiguration {
    baseUrl: string | BaseUrlGetter;
    headers?: Headers | HeadersGetter;
}
export declare const Resource: (config: ResourceConfiguration) => ClassDecorator;
