import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, ActionSheetController, NavController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
var SuppliesPage = /** @class */ (function () {
    function SuppliesPage(navCtrl, database, storage, alertController, actionSheetController, loadingController) {
        this.navCtrl = navCtrl;
        this.database = database;
        this.storage = storage;
        this.alertController = alertController;
        this.actionSheetController = actionSheetController;
        this.loadingController = loadingController;
    }
    SuppliesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getValue("uid").then(function (id) {
            _this.database.getOxygenRechargeById(id).subscribe(function (data) {
                _this.oxygen_recharge = data;
            });
            _this.database.getADSMaterialById(id).subscribe(function (data) {
                _this.ads_materia = data;
            });
            _this.database.getTrainingsById(id).subscribe(function (data) {
                _this.trainings = data;
            });
            _this.database.getVisitsById(id).subscribe(function (data) {
                _this.visits = data;
            });
            _this.database.getMedicalKitById(id).subscribe(function (data) {
                _this.medical_kit = data;
            });
            _this.database.getOccupationalExamById(id).subscribe(function (data) {
                _this.occupational_exam = data;
            });
        });
    };
    SuppliesPage.prototype.confirm_cancel = function (header, message, id, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: header,
                            message: message,
                            inputs: [
                                {
                                    name: 'message',
                                    type: 'text',
                                    placeholder: 'Motivo'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    handler: function (data) {
                                    }
                                },
                                {
                                    text: 'Si',
                                    handler: function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var loading;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.loadingController.create({
                                                        message: 'Hellooo'
                                                    })];
                                                case 1:
                                                    loading = _a.sent();
                                                    return [4 /*yield*/, loading.present()];
                                                case 2:
                                                    _a.sent();
                                                    if (!(type === 'oxygen_recharge')) return [3 /*break*/, 4];
                                                    this.oxygen_recharge.who_canceled = 'User';
                                                    this.oxygen_recharge.date_canceled = new Date().toISOString();
                                                    this.oxygen_recharge.why_canceled = data.message;
                                                    this.oxygen_recharge.state = 'canceled';
                                                    return [4 /*yield*/, this.database.cancelOxygenRecharge(this.oxygen_recharge)];
                                                case 3:
                                                    _a.sent();
                                                    loading.dismiss();
                                                    return [3 /*break*/, 14];
                                                case 4:
                                                    if (!(type === 'ads-material')) return [3 /*break*/, 6];
                                                    this.ads_materia.who_canceled = 'User';
                                                    this.ads_materia.date_canceled = new Date().toISOString();
                                                    this.ads_materia.why_canceled = data.message;
                                                    this.ads_materia.state = 'canceled';
                                                    return [4 /*yield*/, this.database.cancelADSMaterial(this.ads_materia)];
                                                case 5:
                                                    _a.sent();
                                                    loading.dismiss();
                                                    return [3 /*break*/, 14];
                                                case 6:
                                                    if (!(type === 'trainings')) return [3 /*break*/, 8];
                                                    this.trainings.who_canceled = 'User';
                                                    this.trainings.date_canceled = new Date().toISOString();
                                                    this.trainings.why_canceled = data.message;
                                                    this.trainings.state = 'canceled';
                                                    return [4 /*yield*/, this.database.cancelTrainings(this.trainings)];
                                                case 7:
                                                    _a.sent();
                                                    loading.dismiss();
                                                    return [3 /*break*/, 14];
                                                case 8:
                                                    if (!(type === 'visits')) return [3 /*break*/, 10];
                                                    this.visits.who_canceled = 'User';
                                                    this.visits.date_canceled = new Date().toISOString();
                                                    this.visits.why_canceled = data.message;
                                                    this.visits.state = 'canceled';
                                                    return [4 /*yield*/, this.database.cancelVisits(this.visits)];
                                                case 9:
                                                    _a.sent();
                                                    loading.dismiss();
                                                    return [3 /*break*/, 14];
                                                case 10:
                                                    if (!(type === 'medical_kit')) return [3 /*break*/, 12];
                                                    this.medical_kit.who_canceled = 'User';
                                                    this.medical_kit.date_canceled = new Date().toISOString();
                                                    this.medical_kit.why_canceled = data.message;
                                                    this.medical_kit.state = 'canceled';
                                                    return [4 /*yield*/, this.database.cancelMedicalKit(this.medical_kit)];
                                                case 11:
                                                    _a.sent();
                                                    loading.dismiss();
                                                    return [3 /*break*/, 14];
                                                case 12:
                                                    if (!(type === 'occupational_exam')) return [3 /*break*/, 14];
                                                    this.occupational_exam.who_canceled = 'User';
                                                    this.occupational_exam.date_canceled = new Date().toISOString();
                                                    this.occupational_exam.why_canceled = data.message;
                                                    this.occupational_exam.state = 'canceled';
                                                    return [4 /*yield*/, this.database.cancelOccupationalExam(this.occupational_exam)];
                                                case 13:
                                                    _a.sent();
                                                    loading.dismiss();
                                                    _a.label = 14;
                                                case 14: return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuppliesPage.prototype.goOxygenRechargeDetail = function () {
        this.storage.setParams_v2({
            id: this.oxygen_recharge.id,
            state: this.oxygen_recharge.state
        });
        this.navCtrl.navigateForward('oxygen-recharge-check');
    };
    SuppliesPage.prototype.goOxygenRecharge = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.storage.setParams_v2({
                    edit: false
                });
                this.navCtrl.navigateForward('oxygen-recharge');
                return [2 /*return*/];
            });
        });
    };
    SuppliesPage.prototype.GoAdsMaterialDetail = function () {
        this.storage.setParams_v2({
            id: this.ads_materia.id,
            state: this.ads_materia.state
        });
        this.navCtrl.navigateForward('ads-material-check');
    };
    SuppliesPage.prototype.GoAdsMaterial = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.storage.setParams_v2({
                    edit: false
                });
                this.navCtrl.navigateForward('ads-material');
                return [2 /*return*/];
            });
        });
    };
    SuppliesPage.prototype.goTrainingsDetail = function () {
        this.storage.setParams_v2({
            id: this.trainings.id,
            state: this.trainings.state
        });
        this.navCtrl.navigateForward('trainings-check');
    };
    SuppliesPage.prototype.goTrainings = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.storage.setParams_v2({
                    edit: false
                });
                this.navCtrl.navigateForward('trainings');
                return [2 /*return*/];
            });
        });
    };
    SuppliesPage.prototype.goVisitsDetail = function () {
        this.storage.setParams_v2({
            id: this.visits.id,
            state: this.visits.state
        });
        this.navCtrl.navigateForward('visits-check');
    };
    SuppliesPage.prototype.goVisits = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.storage.setParams_v2({
                    edit: false
                });
                this.navCtrl.navigateForward('visits');
                return [2 /*return*/];
            });
        });
    };
    SuppliesPage.prototype.goOccupationalEexamDetail = function () {
        this.storage.setParams_v2({
            id: this.occupational_exam.id,
            state: this.occupational_exam.state
        });
        this.navCtrl.navigateForward('occupational-exam-check');
    };
    SuppliesPage.prototype.goOccupationalEexam = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.storage.setParams_v2({
                    edit: false
                });
                this.navCtrl.navigateForward('occupational-exam');
                return [2 /*return*/];
            });
        });
    };
    SuppliesPage.prototype.goMedicalKitDetail = function () {
        this.storage.setParams_v2({
            id: this.medical_kit.id,
            state: this.medical_kit.state
        });
        this.navCtrl.navigateForward('medical-kit-check');
    };
    SuppliesPage.prototype.goMedicalKit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.storage.setParams_v2({
                    edit: false
                });
                this.navCtrl.navigateForward('medical-kit');
                return [2 /*return*/];
            });
        });
    };
    SuppliesPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    SuppliesPage = tslib_1.__decorate([
        Component({
            selector: 'app-supplies',
            templateUrl: './supplies.page.html',
            styleUrls: ['./supplies.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            DatabaseService,
            StorageService,
            AlertController,
            ActionSheetController,
            LoadingController])
    ], SuppliesPage);
    return SuppliesPage;
}());
export { SuppliesPage };
//# sourceMappingURL=supplies.page.js.map