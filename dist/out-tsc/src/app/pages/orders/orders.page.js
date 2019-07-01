import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import * as moment from 'moment';
var OrdersPage = /** @class */ (function () {
    function OrdersPage(navCtrl, alertController, events, database, auth, storage, loadingController) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.auth = auth;
        this.storage = storage;
        this.loadingController = loadingController;
        this.oxygen_recharge_selec = 's';
        this.ads_material_selec = 's';
        this.trainings_selec = 's';
        this.visits_selec = 's';
        this.medical_kit_selec = 's';
        this.occupational_exam_selec = 's';
    }
    OrdersPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getValue("uid").then(function (uid) {
            _this.database.getOxygenRechargeById(uid).subscribe(function (data) {
                _this.oxygen_recharge_created = data;
            });
            _this.database.getOxygenRechargeCanceled(uid).subscribe(function (data) {
                _this.oxygen_recharge_canceled = data;
            });
            _this.database.getOxygenRechargeFinalizados(uid).subscribe(function (data) {
                _this.oxygen_recharge_finalized = data;
            });
            _this.database.getADSMaterialById(uid).subscribe(function (data) {
                _this.ads_material_created = data;
            });
            _this.database.getADSMaterialCanceled(uid).subscribe(function (data) {
                _this.ads_material_canceled = data;
            });
            _this.database.getADSMaterialFinalizados(uid).subscribe(function (data) {
                _this.ads_material_finalized = data;
            });
            _this.database.getTrainingsById(uid).subscribe(function (data) {
                _this.trainings_created = data;
            });
            _this.database.getTrainingsCanceled(uid).subscribe(function (data) {
                _this.trainings_canceled = data;
            });
            _this.database.getTrainingsFinalizados(uid).subscribe(function (data) {
                _this.trainings_finalized = data;
            });
            _this.database.getVisitsById(uid).subscribe(function (data) {
                _this.visits_created = data;
            });
            _this.database.getVisitsCanceled(uid).subscribe(function (data) {
                _this.visits_canceled = data;
            });
            _this.database.getVisitsFinalizados(uid).subscribe(function (data) {
                _this.visits_finalized = data;
            });
            _this.database.getMedicalKitById(uid).subscribe(function (data) {
                _this.medical_kit_created = data;
            });
            _this.database.getMedicalKitCanceled(uid).subscribe(function (data) {
                _this.medical_kit_canceled = data;
            });
            _this.database.getMedicalKitFinalizados(uid).subscribe(function (data) {
                _this.medical_kit_finalized = data;
            });
            _this.database.getOccupationalExamById(uid).subscribe(function (data) {
                _this.occupational_exam_created = data;
            });
            _this.database.getOccupationalExamCanceled(uid).subscribe(function (data) {
                _this.occupational_exam_canceled = data;
            });
            _this.database.getOccupationalExamFinalizados(uid).subscribe(function (data) {
                _this.occupational_exam_finalized = data;
            });
        });
    };
    OrdersPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    OrdersPage.prototype.change = function (val, type) {
        if (type === 'oxygen_recharge') {
            this.oxygen_recharge_selec = val.detail.value;
        }
        else if (type === 'ads_material') {
            this.ads_material_selec = val.detail.value;
        }
        else if (type === 'trainings') {
            this.trainings_selec = val.detail.value;
        }
        else if (type === 'visits') {
            this.visits_selec = val.detail.value;
        }
        else if (type === 'medical_kit') {
            this.medical_kit_selec = val.detail.value;
        }
        else if (type === 'occupational_exam') {
            this.occupational_exam_selec = val.detail.value;
        }
    };
    OrdersPage.prototype.getRelativeDateTime = function (data) {
        return moment(data, "").fromNow();
    };
    OrdersPage.prototype.checkOxygenRecharge = function (data) {
        this.storage.setParams_v2({
            id: data.id,
            state: data.state
        });
        this.navCtrl.navigateForward('oxygen-recharge-check');
    };
    OrdersPage.prototype.checkAdsMaterial = function (data) {
        this.storage.setParams_v2({
            id: data.id,
            state: data.state
        });
        this.navCtrl.navigateForward('ads-material-check');
    };
    OrdersPage.prototype.checkTrainings = function (data) {
        this.storage.setParams_v2({
            id: data.id,
            state: data.state
        });
        this.navCtrl.navigateForward('trainings-check');
    };
    OrdersPage.prototype.checkVisits = function (data) {
        this.storage.setParams_v2({
            id: data.id,
            state: data.state
        });
        this.navCtrl.navigateForward('visits-check');
    };
    OrdersPage.prototype.checkMedicalKit = function (data) {
        this.storage.setParams_v2({
            id: data.id,
            state: data.state
        });
        this.navCtrl.navigateForward('medical-kit-check');
    };
    OrdersPage.prototype.checkOccupationalExam = function (data) {
        this.storage.setParams_v2({
            id: data.id,
            state: data.state
        });
        this.navCtrl.navigateForward('occupational-exam-check');
    };
    OrdersPage = tslib_1.__decorate([
        Component({
            selector: 'app-orders',
            templateUrl: './orders.page.html',
            styleUrls: ['./orders.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            AuthService,
            StorageService,
            LoadingController])
    ], OrdersPage);
    return OrdersPage;
}());
export { OrdersPage };
//# sourceMappingURL=orders.page.js.map