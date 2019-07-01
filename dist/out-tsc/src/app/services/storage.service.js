import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var StorageService = /** @class */ (function () {
    function StorageService(storage) {
        this.storage = storage;
    }
    StorageService.prototype.setParams = function (key, data) {
        return this.storage.set(key, JSON.stringify(data));
    };
    StorageService.prototype.setParams_v2 = function (data) {
        return this.storage.set('params', JSON.stringify(data));
    };
    StorageService.prototype.getParams = function (key) {
        return this.storage.get(key);
    };
    StorageService.prototype.getParams_2 = function () {
        return this.storage.get('params');
    };
    StorageService.prototype.setValue = function (key, value) {
        this.storage.set(key, value);
    };
    StorageService.prototype.getValue = function (key) {
        return this.storage.get(key);
    };
    StorageService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], StorageService);
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage.service.js.map