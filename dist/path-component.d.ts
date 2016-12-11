export interface PathComponentMetadata {
    name: string;
    index: number;
}
export interface PathComponentsMetadata<T extends PathComponentMetadata> extends Array<T> {
}
