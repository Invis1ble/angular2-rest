import { ParametersMetadata } from './decorators/parameter';
export declare class PathGenerator {
    generate(templatedPath: string, metadata: ParametersMetadata, args: any[]): string;
    protected hydrate(path: string, name: string, value: string | number): string;
}
