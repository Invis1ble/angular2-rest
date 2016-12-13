import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ClientType } from '../client';
import { Headers, HeadersGetter } from '../headers';
import { RequestTransformerType, ResponseTransformerType } from '../transformer';
export declare type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface ActionConfiguration<RequestData, TransformedRequestData, ResponseData, TransformedResponseData> {
    client?: ClientType;
    method?: Method;
    path: string;
    headers?: Headers | HeadersGetter;
    requestTransformer?: RequestTransformerType<RequestData, TransformedRequestData>;
    useRawResponse?: boolean;
    responseTransformer?: ResponseTransformerType<ResponseData, TransformedResponseData>;
}
export declare const Action: <RequestData, TransformedRequestData, ResponseData, TransformedResponseData>(config: ActionConfiguration<RequestData, TransformedRequestData, ResponseData, TransformedResponseData>) => MethodDecorator;
