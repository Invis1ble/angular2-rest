import { PathComponentMetadata, PathComponentsMetadata } from '../path-component';
import { buildPathComponentDecorator } from '../utils';

export const queriesMetadataKey = Symbol('rest:queries');

export interface QueryMetadata extends PathComponentMetadata {

}

export interface QueriesMetadata extends PathComponentsMetadata<QueryMetadata> {

}

export const Query = buildPathComponentDecorator<QueryMetadata, QueriesMetadata>(queriesMetadataKey);
