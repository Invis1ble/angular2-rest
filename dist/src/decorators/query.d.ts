import { PathComponentMetadata, PathComponentsMetadata } from '../path-component';
export declare const queriesMetadataKey: symbol;
export interface QueryMetadata extends PathComponentMetadata {
}
export interface QueriesMetadata extends PathComponentsMetadata<QueryMetadata> {
}
export declare const Query: (name: string) => ParameterDecorator;
