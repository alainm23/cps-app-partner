import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { LoadingController, NavController } from '@ionic/angular';
var AppointmentSpecialtyPage = /** @class */ (function () {
    function AppointmentSpecialtyPage(api, loadingController, navCtrl, storage) {
        this.api = api;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.url_imagenes = "http://preview.cps.com.pe/";
        this.final_data = {
            precio_extranjero: 0,
            precio_nacional: 0,
            nombre: '',
            descripcion: '',
            fecha: '',
            medico_id: '',
            id_con: '',
            hor_con: ''
        };
    }
    AppointmentSpecialtyPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
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
                        this.api.getEspecialidades().subscribe(function (data) {
                            _this.especialidades = data.especialidades;
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AppointmentSpecialtyPage.prototype.select = function (item) {
        this.clear_buttons(item.id);
        this.final_data.precio_extranjero = item.precio_extranjero;
        this.final_data.precio_nacional = item.precio_nacional;
        this.final_data.nombre = item.nombre;
        this.final_data.descripcion = item.descripcion;
        this.storage.setParams('params', this.final_data);
        console.log(this.final_data);
        this.navCtrl.navigateForward('appointment-date');
    };
    AppointmentSpecialtyPage.prototype.clear_buttons = function (id) {
        try {
            var elem = document.getElementById('es-' + id);
            elem.setAttribute("style", "border: 6px solid #230084;");
            for (var _i = 0, _a = this.especialidades; _i < _a.length; _i++) {
                var item = _a[_i];
                try {
                    if (item.id !== id) {
                        var elem_1 = document.getElementById('es-' + item.id);
                        elem_1.setAttribute("style", "border: 0px solid #fff;");
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    AppointmentSpecialtyPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    AppointmentSpecialtyPage = tslib_1.__decorate([
        Component({
            selector: 'app-appointment-specialty',
            templateUrl: './appointment-specialty.page.html',
            styleUrls: ['./appointment-specialty.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService,
            LoadingController,
            NavController,
            StorageService])
    ], AppointmentSpecialtyPage);
    return AppointmentSpecialtyPage;
}());
export { AppointmentSpecialtyPage };
//# sourceMappingURL=appointment-specialty.page.js.map