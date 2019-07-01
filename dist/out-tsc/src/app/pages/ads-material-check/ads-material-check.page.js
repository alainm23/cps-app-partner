import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, ActionSheetController, NavController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
import * as moment from 'moment';
var AdsMaterialCheckPage = /** @class */ (function () {
    function AdsMaterialCheckPage(navCtrl, database, storage, alertController, actionSheetController, loadingController) {
        this.navCtrl = navCtrl;
        this.database = database;
        this.storage = storage;
        this.alertController = alertController;
        this.actionSheetController = actionSheetController;
        this.loadingController = loadingController;
    }
    AdsMaterialCheckPage.prototype.ngOnInit = function () {
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
                            console.log(params);
                            if (params.state === 'created' || params.state === 'approved') {
                                _this.database.getADSMaterialById(params.id).subscribe(function (data) {
                                    _this._object = data;
                                    loading.dismiss();
                                });
                            }
                            else if (params.state === 'canceled') {
                                _this.database.getADSMaterialCanceladoByKey(params.id).subscribe(function (data) {
                                    _this._object = data;
                                    loading.dismiss();
                                });
                            }
                            else if (params.state === 'finalized') {
                                _this.database.getADSMaterialFinalizadosByKey(params.id).subscribe(function (data) {
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
    AdsMaterialCheckPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    AdsMaterialCheckPage.prototype.edit = function () {
        this.storage.setParams_v2({
            id: this._object.id,
            edit: true
        });
        this.navCtrl.navigateForward('ads-material');
    };
    AdsMaterialCheckPage.prototype.getRelativeDateTime = function (data) {
        return moment(data, "").fromNow();
    };
    AdsMaterialCheckPage.prototype.getFormatDateTime = function (data) {
        return moment(data).format("lll");
    };
    AdsMaterialCheckPage = tslib_1.__decorate([
        Component({
            selector: 'app-ads-material-check',
            templateUrl: './ads-material-check.page.html',
            styleUrls: ['./ads-material-check.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            DatabaseService,
            StorageService,
            AlertController,
            ActionSheetController,
            LoadingController])
    ], AdsMaterialCheckPage);
    return AdsMaterialCheckPage;
}());
export { AdsMaterialCheckPage };
//# sourceMappingURL=ads-material-check.page.js.map