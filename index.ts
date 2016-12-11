import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { MethodResolver } from './src/method-resolver';
import { PathGenerator } from './src/path-generator';

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
