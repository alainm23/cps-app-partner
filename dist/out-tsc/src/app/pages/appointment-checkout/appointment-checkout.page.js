import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var AppointmentCheckoutPage = /** @class */ (function () {
    function AppointmentCheckoutPage(navCtrl, alertController, events, database, storage, loadingController, api, auth, payment) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.storage = storage;
        this.loadingController = loadingController;
        this.api = api;
        this.auth = auth;
        this.payment = payment;
        this.price = "0";
        this.final_data = {
            precio_extranjero: 0,
            precio_nacional: 0,
            nombre: '',
            fecha: '',
            medico_id: '',
            id_con: '',
            hor_con: ''
        };
        this.first_pay = true;
    }
    AppointmentCheckoutPage.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new FormGroup({
            name: new FormControl(this.auth.user.fullname, Validators.required),
            phone_number: new FormControl(this.auth.user.country_dial_code + ' ' + this.auth.user.phone_number, Validators.required),
            nationality: new FormControl('', Validators.required),
            email: new FormControl(this.auth.user.email, Validators.required),
            address: new FormControl(this.auth.user.address, Validators.required),
            message: new FormControl(''),
            terms_conditions: new FormControl(false, Validators.compose([
                Validators.required,
                Validators.pattern('true')
            ]))
        });
        this.storage.getParams("params").then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var params, loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = JSON.parse(data);
                        this.final_data.fecha = params.fecha;
                        this.final_data.nombre = params.nombre;
                        this.final_data.precio_nacional = params.precio_nacional;
                        this.final_data.precio_extranjero = params.precio_extranjero;
                        this.final_data.medico_id = params.medico_id;
                        this.final_data.id_con = params.id_con;
                        this.final_data.hor_con = params.hor_con;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Hellooo'
                            })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        loading.dismiss().then(function () {
                            _this.payment.initCulqi();
                        });
                        this.onSelectChange('peruano');
                        this.events.subscribe('get_token', function (token) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var loading, value, data;
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
                                        value = this.form.value;
                                        data = {
                                            token: token,
                                            monto: parseInt(this.price) * 100,
                                            correo: value.email,
                                            moneda: 'PEN',
                                            des: "Pago de consulta medica - " + this.final_data.nombre,
                                            consulta: this.final_data.id_con,
                                            doctor: this.final_data.medico_id
                                        };
                                        this.api.procesarPago(data).subscribe(function (response) {
                                            console.log(response);
                                            if (response.estado === 1 && response.libre === 1 && response.respuesta.outcome.type === 'venta_exitosa') {
                                                var data_cita = {
                                                    key: '',
                                                    cliente_nombre: value.name,
                                                    phone_number: value.phone_number,
                                                    nationality: value.nationality,
                                                    email: value.email,
                                                    address: value.address,
                                                    message: value.message,
                                                    price: _this.price,
                                                    specialty_name: _this.final_data.nombre,
                                                    date: _this.final_data.fecha,
                                                    hour: _this.final_data.hor_con
                                                };
                                                _this.database.addAppointment(_this.auth.user.id, data_cita).then(function (resonse_key) {
                                                    var key = resonse_key;
                                                    var data = {
                                                        consulta: _this.final_data.id_con,
                                                        nacionalidad: value.nationality,
                                                        email: value.email,
                                                        message: value.message,
                                                        id_tra: response.respuesta.id,
                                                        phone: value.phone_number,
                                                        name: value.name,
                                                        especialidad: _this.final_data.nombre,
                                                        idioma: 'es'
                                                    };
                                                    _this.api.checkoutapp(data).subscribe(function (response_checkout) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        var alert_1;
                                                        return tslib_1.__generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    console.log(response_checkout);
                                                                    loading.dismiss();
                                                                    if (!(response_checkout.estado === 1)) return [3 /*break*/, 1];
                                                                    loading.dismiss();
                                                                    this.storage.setParams('params', {
                                                                        id: resonse_key
                                                                    });
                                                                    this.navCtrl.navigateRoot('appointment-details');
                                                                    return [3 /*break*/, 4];
                                                                case 1:
                                                                    loading.dismiss();
                                                                    return [4 /*yield*/, this.alertController.create({
                                                                            header: 'Error con la reserva!',
                                                                            message: 'La cita fue pagada, pero por algun error no se pudo almacenar en la base de datos.',
                                                                            buttons: ['OK']
                                                                        })];
                                                                case 2:
                                                                    alert_1 = _a.sent();
                                                                    return [4 /*yield*/, alert_1.present()];
                                                                case 3:
                                                                    _a.sent();
                                                                    _a.label = 4;
                                                                case 4: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); }, function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        var alert;
                                                        return tslib_1.__generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    loading.dismiss();
                                                                    return [4 /*yield*/, this.alertController.create({
                                                                            header: 'Error!',
                                                                            message: 'Ocurrio un error en la reserva.',
                                                                            buttons: ['OK']
                                                                        })];
                                                                case 1:
                                                                    alert = _a.sent();
                                                                    return [4 /*yield*/, alert.present()];
                                                                case 2:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); });
                                                });
                                            }
                                        }, function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var alert;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        loading.dismiss();
                                                        return [4 /*yield*/, this.alertController.create({
                                                                header: 'Error!',
                                                                message: 'Ocurrio un error en la reserva.',
                                                                buttons: ['OK']
                                                            })];
                                                    case 1:
                                                        alert = _a.sent();
                                                        return [4 /*yield*/, alert.present()];
                                                    case 2:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AppointmentCheckoutPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('get_token', null);
    };
    AppointmentCheckoutPage.prototype.onSelectChange = function (event) {
        if (event === "peruano") {
            this.price = this.final_data.precio_nacional;
        }
        else {
            this.price = this.final_data.precio_extranjero;
        }
    };
    AppointmentCheckoutPage.prototype.openCheckout = function () {
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
                        this.payment.cfgFormulario("Pago por servicio", parseInt(this.price) * 100); // 300.000
                        // 9.99
                        // Cuando la configuracion termina, llamo al metodo open () para abrir el formulario 
                        loading.dismiss().then(function () {
                            _this.payment.open();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AppointmentCheckoutPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    AppointmentCheckoutPage = tslib_1.__decorate([
        Component({
            selector: 'app-appointment-checkout',
            templateUrl: './appointment-checkout.page.html',
            styleUrls: ['./appointment-checkout.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            StorageService,
            LoadingController,
            ApiService,
            AuthService,
            PaymentService])
    ], AppointmentCheckoutPage);
    return AppointmentCheckoutPage;
}());
export { AppointmentCheckoutPage };
//# sourceMappingURL=appointment-checkout.page.js.map