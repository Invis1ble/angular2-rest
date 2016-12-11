import { Response, Request } from '@angular/http';
import { Type } from '@angular/core';

import { Observable } from 'rxjs/Observable';

export interface Client {
    request(request: Request): Observable<Response>;
}

export interface ClientType extends Type<Client> {

}
