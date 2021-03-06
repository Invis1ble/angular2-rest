import { Headers as AngularHeaders, Http, Request, Response, URLSearchParams } from '@angular/http';
import { RequestArgs } from '@angular/http/src/interfaces';
import { isPresent } from '@angular/core/src/facade/lang';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { BodyMetadata, bodyMetadataKey } from './body';
import { Client, ClientType } from '../client';
import { Headers, HeadersGetter } from '../headers';
import { MethodResolver } from '../method-resolver';
import { ParametersMetadata, parametersMetadataKey } from './parameter';
import { PathGenerator } from '../path-generator';
import { QueryMetadata, QueriesMetadata, queriesMetadataKey } from './query';
import { RestService } from '../rest.service';
import { RequestTransformerType, ResponseTransformerType, Transformer } from '../transformer';
import { resourceMetadataKey, ResourceConfiguration } from './resource';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ActionConfiguration<RequestData, TransformedRequestData, ResponseData, TransformedResponseData> {
    client?: ClientType;
    method?: Method;
    path: string;
    headers?: Headers | HeadersGetter;
    requestTransformer?: RequestTransformerType<RequestData, TransformedRequestData>;
    useRawResponse?: boolean;
    responseTransformer?: ResponseTransformerType<ResponseData, TransformedResponseData>;
}

const appendHeaders = (service: RestService, headers: AngularHeaders, additionalHeaders: Headers | HeadersGetter | undefined): void => {
    if (!isPresent(additionalHeaders)) {
        return;
    }

    if ('function' === typeof additionalHeaders) {
        additionalHeaders = <Headers>additionalHeaders.call(service);
    }

    for (let name in additionalHeaders) {
        if (additionalHeaders.hasOwnProperty(name)) {
            headers.append(name, additionalHeaders[name]);
        }
    }
};

export const Action = function <RequestData, TransformedRequestData, ResponseData, TransformedResponseData>(config: ActionConfiguration<RequestData, TransformedRequestData, ResponseData, TransformedResponseData>): MethodDecorator {
    return function <D extends TypedPropertyDescriptor<(...args: any[]) => Observable<Response | TransformedResponseData>>>(service: RestService, methodName: string, descriptor: D): D {
        descriptor.value = function (...args: any[]) {
            const resourceConfig: ResourceConfiguration = Reflect.getMetadata(resourceMetadataKey, service);

            if (!isPresent(resourceConfig)) {
                throw new Error('Resource configuration is not found.');
            }

            if (!isPresent(resourceConfig.baseUrl)) {
                throw new Error('Base URL is not defined.');
            }

            let baseUrl: string;

            if ('string' === typeof resourceConfig.baseUrl) {
                baseUrl = resourceConfig.baseUrl;
            } else {
                baseUrl = resourceConfig.baseUrl.call(this);
            }

            const requestOptions: RequestArgs = {
                url: baseUrl,
                headers: new AngularHeaders()
            };

            const parametersMetadata: ParametersMetadata = Reflect.getOwnMetadata(parametersMetadataKey, service, methodName);

            if (isPresent(parametersMetadata)) {
                const generator: PathGenerator = this.injector.get(PathGenerator);
                requestOptions.url += generator.generate(config.path, parametersMetadata, args);
            } else {
                requestOptions.url += config.path;
            }

            if (isPresent(config.method)) {
                requestOptions.method = config.method;
            } else {
                const methodResolver: MethodResolver = this.injector.get(MethodResolver);
                requestOptions.method = methodResolver.resolve(methodName);
            }

            appendHeaders(service, requestOptions.headers, resourceConfig.headers);
            appendHeaders(service, requestOptions.headers, config.headers);

            const queriesMetadata: QueriesMetadata = Reflect.getOwnMetadata(queriesMetadataKey, service, methodName);

            if (isPresent(queriesMetadata)) {
                requestOptions.search = queriesMetadata.reduce((search: URLSearchParams, metadata: QueryMetadata) => {
                    search.set(metadata.name, args[metadata.index]);
                    return search;
                }, new URLSearchParams());
            }

            const bodyMetadata: BodyMetadata = Reflect.getOwnMetadata(bodyMetadataKey, service, methodName);

            if (isPresent(bodyMetadata)) {
                requestOptions.body = args[bodyMetadata.index];

                if (isPresent(config.requestTransformer)) {
                    const requestTransformer: Transformer<RequestData, TransformedRequestData> = this.injector.get(config.requestTransformer);
                    requestOptions.body = requestTransformer.transform(requestOptions.body);
                }
            }

            const client: Client = this.injector.get(config.client || resourceConfig.client || Http);

            let response = client.request(new Request(requestOptions));

            if (true !== config.useRawResponse) {
                response = response.map(response => response.json());
            }

            if (!isPresent(config.responseTransformer)) {
                return response;
            }

            const responseTransformer: Transformer<ResponseData, TransformedResponseData> = this.injector.get(config.responseTransformer);

            return response.switchMap((response) => {
                const transformed = responseTransformer.transform(response);

                if (transformed instanceof Observable) {
                    return transformed;
                }

                return Observable.of(transformed);
            });
        };

        return descriptor;
    };
};
