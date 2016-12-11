import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { MethodResolver } from './method-resolver';
import { PathGenerator } from './path-generator';

@NgModule({
    imports: [
        CommonModule
    ]
})
export class RestModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RestModule,
            providers: [
                MethodResolver,
                PathGenerator
            ]
        };
    }
}
