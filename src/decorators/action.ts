import { Headers as AngularHeaders, Http, Request, Response, URLSearchParams } from '@angular/http';
import { RequestArgs } from '@angular/http/src/interfaces';
import { isPresent } from '@angular/core/src/facade/lang';

import { Observable } from 'rxjs/Observable';
import 'reflect-metadata';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { BodyMetadata, bodyMetadataKey } from './body';
import { Client, ClientType } from '../client';
import { Headers, HeadersGetter, headersMetadataKey } from '../headers';
import { MethodResolver } from '../method-resolver';
import { ParametersMetadata, parametersMetadataKey } from './parameter';
import { PathGenerator } from '../path-generator';
import { RestService } from '../rest.service';
import { RequestTransformerType, ResponseTransformerType, Transformer } from '../transformer';
import { QueryMetadata, QueriesMetadata, queriesMetadataKey } from './query';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ActionConfiguration<Data, TransformedData> {
    client?: ClientType;
    method?: Method;
    path: string;
    headers?: Headers | HeadersGetter;
    useRawResponse?: boolean;
    responseTransformer?: ResponseTransformerType<Data, TransformedData>;
    requestTransformer?: RequestTransformerType<Data, TransformedData>;
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

export const Action = function <Data, TransformedData>(config: ActionConfiguration<Data, TransformedData>): MethodDecorator {
    return function <D extends TypedPropertyDescriptor<(...args: any[]) => Observable<Response | TransformedData>>>(service: RestService, methodName: string, descriptor: D): D {
        descriptor.value = function (...args: any[]) {
            const client: Client = this.injector.get(config.client || Http);

            if (!isPresent(config.method)) {
                const methodResolver: MethodResolver = this.injector.get(MethodResolver);
                config.method = methodResolver.resolve(methodName);
            }

            const parametersMetadata: ParametersMetadata = Reflect.getOwnMetadata(parametersMetadataKey, service, methodName);

            if (isPresent(parametersMetadata)) {
                const generator: PathGenerator = this.injector.get(PathGenerator);
                config.path = generator.generate(config.path, parametersMetadata, args);
            }

            const headers: AngularHeaders = new AngularHeaders();

            appendHeaders(service, headers, Reflect.getOwnMetadata(headersMetadataKey, service.constructor));
            appendHeaders(service, headers, config.headers);

            const requestOptions: RequestArgs = {
                url: this.getBaseUrl() + config.path,
                method: config.method,
                headers: headers
            };

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
                    const requestTransformer: Transformer<Data, TransformedData> = this.injector.get(config.requestTransformer);
                    requestOptions.body = requestTransformer.transform(requestOptions.body);
                }
            }

            let response = client.request(new Request(requestOptions));

            if (true !== config.useRawResponse) {
                response = response.map(response => response.json());
            }

            if (!isPresent(config.responseTransformer)) {
                return response;
            }

            const responseTransformer: Transformer<Data, TransformedData> = this.injector.get(config.responseTransformer);

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
