export const headersMetadataKey = Symbol('rest:headers');

export interface Headers {
    [name: string]: string;
}

export interface HeadersGetter {
    (): Headers;
}
