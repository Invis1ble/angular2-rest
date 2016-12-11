import { PathComponentMetadata, PathComponentsMetadata } from '../path-component';
import { buildPathComponentDecorator } from '../utils';

export const parametersMetadataKey = Symbol('rest:parameters');

export interface ParameterMetadata extends PathComponentMetadata {

}

export interface ParametersMetadata extends PathComponentsMetadata<ParameterMetadata> {

}

export const Parameter = buildPathComponentDecorator<ParameterMetadata, ParametersMetadata>(parametersMetadataKey);
