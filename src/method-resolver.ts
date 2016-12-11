import { Injectable } from '@angular/core';

import { Method } from './decorators/action';

@Injectable()
export class MethodResolver {

    protected parser: RegExp = /^[a-z]+/;

    protected dictionary: {[word: string]: Method} = {
        get: 'GET',
        find: 'GET',
        show: 'GET',
        query: 'GET',
        post: 'POST',
        create: 'POST',
        put: 'PUT',
        update: 'PUT',
        patch: 'PATCH',
        'delete': 'DELETE',
        remove: 'DELETE'
    };

    resolve(string: string): Method {
        const matches = string.match(this.parser);

        if (null === matches || !this.dictionary.hasOwnProperty(matches[0])) {
            throw new Error('Could not resolve method name.');
        }

        return this.dictionary[matches[0]];
    }

}
