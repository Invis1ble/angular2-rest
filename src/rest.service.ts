import { Injector } from '@angular/core';

export abstract class RestService {

    constructor(protected injector: Injector) {}

    protected abstract getBaseUrl(): string;

}
