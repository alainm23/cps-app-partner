import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, ActionSheetController, NavController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
import * as moment from 'moment';
var MedicalKitCheckPage = /** @class */ (function () {
    function MedicalKitCheckPage(navCtrl, database, storage, alertController, actionSheetController, loadingController) {
        this.navCtrl = navCtrl;
        this.database = database;
        this.storage = storage;
        this.alertController = alertController;
        this.actionSheetController = actionSheetController;
        this.loadingController = loadingController;
    }
    MedicalKitCheckPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Tu solicitud está en procesando... espere un momento'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.storage.getParams_2().then(function (data) {
                            var params = JSON.parse(data);
                            if (params.state === 'created' || params.state === 'approved') {
                                _this.database.getMedicalKitById(params.id).subscribe(function (data) {
                                    _this._object = data;
                                    loading.dismiss();
                                });
                            }
                            else if (params.state === 'canceled') {
                                _this.database.getMedicalKitCanceladoByKey(params.id).subscribe(function (data) {
                                    _this._object = data;
                                    loading.dismiss();
                                });
                            }
                            else if (params.state === 'finalized') {
                                _this.database.getMedicalKitFinalizadosByKey(params.id).subscribe(function (data) {
                                    _this._object = data;
                                    loading.dismiss();
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MedicalKitCheckPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    MedicalKitCheckPage.prototype.edit = function () {
        this.storage.setParams_v2({
            id: this._object.id,
            edit: true
        });
        this.navCtrl.navigateForward('medical-kit');
    };
    MedicalKitCheckPage.prototype.getRelativeDateTime = function (data) {
        return moment(data, "").fromNow();
    };
    MedicalKitCheckPage.prototype.getFormatDateTime = function (data) {
        return moment(data).format("lll");
    };
    MedicalKitCheckPage = tslib_1.__decorate([
        Component({
            selector: 'app-medical-kit-check',
            templateUrl: './medical-kit-check.page.html',
            styleUrls: ['./medical-kit-check.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            DatabaseService,
            StorageService,
            AlertController,
            ActionSheetController,
            LoadingController])
    ], MedicalKitCheckPage);
    return MedicalKitCheckPage;
}());
export { MedicalKitCheckPage };
//# sourceMappingURL=medical-kit-check.page.js.map