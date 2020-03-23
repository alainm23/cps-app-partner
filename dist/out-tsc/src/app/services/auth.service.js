import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';
var AuthService = /** @class */ (function () {
    function AuthService(afAuth, database, storage) {
        var _this = this;
        this.afAuth = afAuth;
        this.database = database;
        this.storage = storage;
        this.user = {
            id: '',
            fullname: '',
            email: '',
            phone_number: '',
            is_active: '',
            ruc: '',
            address: '',
            company_name: '',
            logotipo: '',
            country_name: '',
            country_dial_code: '',
            country_code: '',
        };
        this.afAuth.authState.subscribe(function (data) {
            if (data) {
                _this.storage.setValue("uid", data.uid);
                _this.database.get_User_Partner(data.uid).subscribe(function (data) {
                    _this.user = data;
                });
            }
        });
    }
    AuthService.prototype.is_logged = function () {
        return this.afAuth.authState;
    };
    AuthService.prototype.loginEmailPassword = function (email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.signOut = function () {
        return this.afAuth.auth.signOut();
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            DatabaseService,
            StorageService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map