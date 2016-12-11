"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var MethodResolver = (function () {
    function MethodResolver() {
        this.parser = /^[a-z]+/;
        this.dictionary = {
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
    }
    MethodResolver.prototype.resolve = function (string) {
        var matches = string.match(this.parser);
        if (null === matches || !this.dictionary.hasOwnProperty(matches[0])) {
            throw new Error('Could not resolve method name.');
        }
        return this.dictionary[matches[0]];
    };
    MethodResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MethodResolver);
    return MethodResolver;
}());
exports.MethodResolver = MethodResolver;
//# sourceMappingURL=method-resolver.js.map