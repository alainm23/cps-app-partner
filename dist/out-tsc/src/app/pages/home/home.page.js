import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
var HomePage = /** @class */ (function () {
    function HomePage(auth, navCtrl, database, storage) {
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.database = database;
        this.storage = storage;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.is_logged().subscribe(function (response) {
            if (!response) {
                _this.navCtrl.navigateRoot('/login');
            }
            else {
                _this.database.getSendAmbulance(response.uid).subscribe(function (data) {
                    _this.ambulance = data;
                });
            }
        });
    };
    HomePage.prototype.goSupplies = function () {
        this.navCtrl.navigateForward("supplies");
    };
    HomePage.prototype.goCPSRadio = function () {
        window.open("http://www.radiocps.com/", "_system", "location=yes");
    };
    HomePage.prototype.goBlogNews = function () {
        window.open("http://preview.cps.com.pe/articles", "_system", "location=yes");
    };
    HomePage.prototype.GoAppointmentSpecialty = function () {
        this.navCtrl.navigateForward('appointment-specialty');
    };
    HomePage.prototype.goEmergencyPage = function () {
        this.navCtrl.navigateForward('emergency');
    };
    HomePage.prototype.goHomeDoctor = function () {
        this.navCtrl.navigateForward('');
    };
    HomePage.prototype.goHomeNurse = function () {
    };
    HomePage.prototype.goAmbulanceCheck = function () {
        var _this = this;
        this.storage.getValue('uid').then(function (uid) {
            _this.storage.setParams('params', {
                id: uid
            });
            _this.navCtrl.navigateForward('ambulance-check');
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            NavController,
            DatabaseService,
            StorageService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map