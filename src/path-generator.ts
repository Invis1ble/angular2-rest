import { Injectable } from '@angular/core';

import { ParametersMetadata } from './decorators/parameter';

@Injectable()
export class PathGenerator {

    generate(templatedPath: string, metadata: ParametersMetadata, args: any[]): string {
        return metadata.reduce<string>((path, parameter) => {
            return this.hydrate(path, parameter.name, args[parameter.index]);
        }, templatedPath);
    }

    protected hydrate(path: string, name: string, value: string | number): string {
        return path.replace(`{${name}}`, `${value}`);
    }

}
