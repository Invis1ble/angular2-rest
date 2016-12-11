import 'reflect-metadata';
import { PathComponentMetadata, PathComponentsMetadata } from './path-component';
export declare const buildPathComponentDecorator: <M extends PathComponentMetadata, C extends PathComponentsMetadata<M>>(pathComponentMetadataKey: symbol) => (name: string) => ParameterDecorator;
