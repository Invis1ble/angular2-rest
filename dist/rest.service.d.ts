import { Injector } from '@angular/core';
export declare abstract class RestService {
    protected injector: Injector;
    constructor(injector: Injector);
    protected abstract getBaseUrl(): string;
}
