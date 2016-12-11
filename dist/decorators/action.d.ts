import 'reflect-metadata';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ClientType } from '../client';
import { Headers, HeadersGetter } from '../headers';
import { RequestTransformerType, ResponseTransformerType } from '../transformer';
export declare type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface ActionConfiguration<Data, TransformedData> {
    client?: ClientType;
    method?: Method;
    path: string;
    headers?: Headers | HeadersGetter;
    useRawResponse?: boolean;
    responseTransformer?: ResponseTransformerType<Data, TransformedData>;
    requestTransformer?: RequestTransformerType<Data, TransformedData>;
}
export declare const Action: <Data, TransformedData>(config: ActionConfiguration<Data, TransformedData>) => MethodDecorator;
