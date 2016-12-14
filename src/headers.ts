export interface Headers {
    [name: string]: string;
}

export interface HeadersGetter {
    (): Headers;
}
