import { Response } from '@angular/http';
import { Type } from '@angular/core';
export interface TransformSignature<Data, TransformedData> {
    <Data>(data: Data): TransformedData;
}
export interface Transformer<Data, TransformedData> {
    transform: TransformSignature<Data, TransformedData>;
}
export interface ResponseTransformerType<Data, TransformedData> extends Type<Transformer<Response | Data, TransformedData>> {
}
export interface RequestTransformerType<Data, TransformedData> extends Type<Transformer<Data, TransformedData>> {
}
