import { PathComponentMetadata, PathComponentsMetadata } from '../path-component';
export declare const parametersMetadataKey: symbol;
export interface ParameterMetadata extends PathComponentMetadata {
}
export interface ParametersMetadata extends PathComponentsMetadata<ParameterMetadata> {
}
export declare const Parameter: (name: string) => ParameterDecorator;
