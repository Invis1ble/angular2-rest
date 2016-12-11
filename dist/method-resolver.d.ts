/// <reference types="core-js" />
import { Method } from './decorators/action';
export declare class MethodResolver {
    protected parser: RegExp;
    protected dictionary: {
        [word: string]: Method;
    };
    resolve(string: string): Method;
}
