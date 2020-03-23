import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { LoadingController, NavController } from '@ionic/angular';
import * as moment from 'moment';
var AppointmentDatePage = /** @class */ (function () {
    function AppointmentDatePage(api, loadingController, navCtrl, storage) {
        this.api = api;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.enabled_days = [];
        this.final_data = {
            precio_extranjero: 0,
            precio_nacional: 0,
            nombre: '',
            fecha: '',
            medico_id: '',
            id_con: '',
            hor_con: ''
        };
        this.check_1 = false;
        this.check_2 = false;
    }
    AppointmentDatePage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.storage.getParams("params").then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var params, loading;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                params = JSON.parse(data);
                                this.final_data.precio_extranjero = params.precio_extranjero;
                                this.final_data.precio_nacional = params.precio_nacional;
                                this.final_data.nombre = params.nombre;
                                this.final_data.descripcion = params.descripcion;
                                this.date = new Date();
                                this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                this.getDaysOfMonth();
                                return [4 /*yield*/, this.loadingController.create({
                                        message: 'Hellooo'
                                    })];
                            case 1:
                                loading = _a.sent();
                                return [4 /*yield*/, loading.present()];
                            case 2:
                                _a.sent();
                                this.api.getCitasEspecialidad(this.final_data.nombre.toLowerCase()).subscribe(function (data) {
                                    console.log(data.citas);
                                    _this.citas = data.citas;
                                    _this.enabled_days = [];
                                    for (var _i = 0, _a = data.citas; _i < _a.length; _i++) {
                                        var cita = _a[_i];
                                        var date = new Date(cita.fec_cit);
                                        date.setDate(date.getDate() + 1);
                                        _this.enabled_days.push(date);
                                    }
                                    _this.getDaysOfMonth();
                                    loading.dismiss();
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    AppointmentDatePage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    AppointmentDatePage.prototype.is_enable_day = function (day) {
        var month = this.date.getMonth();
        var year = this.date.getFullYear();
        var dinamic_date = new Date(year, month, day);
        for (var _i = 0, _a = this.enabled_days; _i < _a.length; _i++) {
            var date = _a[_i];
            if (date.getDate() === dinamic_date.getDate()) {
                if (date.getMonth() === dinamic_date.getMonth()) {
                    return true;
                }
            }
        }
        return false;
    };
    AppointmentDatePage.prototype.getDaysOfMonth = function () {
        this.daysInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();
        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        }
        else {
            this.currentDate = 999;
        }
        var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }
        var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (var j = 0; j < thisNumOfDays; j++) {
            this.daysInThisMonth.push(j + 1);
        }
        var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        for (var k = 0; k < (6 - lastDayThisMonth); k++) {
            this.daysInNextMonth.push(k + 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
                this.daysInNextMonth.push(l);
            }
        }
    };
    AppointmentDatePage.prototype.goToLastMonth = function () {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
        this.clear_all_days();
    };
    AppointmentDatePage.prototype.goToNextMonth = function () {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
        this.clear_all_days();
    };
    AppointmentDatePage.prototype.selectDate = function (day, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var month, year, dinamic_date, _loop_1, this_1, _i, _a, date;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        month = this.date.getMonth();
                        year = this.date.getFullYear();
                        dinamic_date = new Date(year, month, day);
                        _loop_1 = function (date) {
                            var loading_1, elem, _month, _day, _i, _a, cita;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(date.getDate() === dinamic_date.getDate())) return [3 /*break*/, 3];
                                        if (!(date.getMonth() === dinamic_date.getMonth())) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_1.loadingController.create({
                                                message: 'Hellooo'
                                            })];
                                    case 1:
                                        loading_1 = _b.sent();
                                        return [4 /*yield*/, loading_1.present()];
                                    case 2:
                                        _b.sent();
                                        this_1.clear_all_days();
                                        elem = document.getElementById('calendar-' + day.toString());
                                        elem.setAttribute("style", "background-color: #230084; border-radius: 6px; color: #fff !important;");
                                        _month = month.toString();
                                        _day = day.toString();
                                        if (_month.length <= 1) {
                                            _month = "0" + (month + 1).toString();
                                        }
                                        if (_day.length <= 1) {
                                            _day = "0" + day.toString();
                                        }
                                        this_1.final_data.fecha = year.toString() + "-" + _month + "-" + _day;
                                        for (_i = 0, _a = this_1.citas; _i < _a.length; _i++) {
                                            cita = _a[_i];
                                            if (cita.fec_cit === this_1.final_data.fecha) {
                                                this_1.final_data.medico_id = cita.med_esp;
                                            }
                                        }
                                        this_1.api.getHorariosFecha(this_1.final_data.medico_id, this_1.final_data.fecha).subscribe(function (data) {
                                            loading_1.dismiss();
                                            _this.check_1 = true;
                                            _this.horas = data.horas;
                                            console.log(data.horas);
                                        });
                                        _b.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = this.enabled_days;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        date = _a[_i];
                        return [5 /*yield**/, _loop_1(date)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentDatePage.prototype.clear_all_days = function () {
        for (var _i = 0, _a = this.daysInThisMonth; _i < _a.length; _i++) {
            var day = _a[_i];
            try {
                var elem = document.getElementById('calendar-' + day);
                elem.setAttribute("style", "background-color: #fff;");
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    AppointmentDatePage.prototype.isMorning = function (time) {
        var hour = time.substring(0, 2);
        var _hour = parseInt(hour);
        if (_hour > 0 && _hour < 13) {
            return true;
        }
        return false;
    };
    AppointmentDatePage.prototype.isAfternoon = function (time) {
        var hour = time.substring(0, 2);
        var _hour = parseInt(hour);
        if (_hour > 12 && _hour < 18) {
            return true;
        }
        return false;
    };
    AppointmentDatePage.prototype.isEvening = function (time) {
        var hour = time.substring(0, 2);
        var _hour = parseInt(hour);
        if (_hour > 18 && _hour < 23) {
            return true;
        }
        return false;
    };
    AppointmentDatePage.prototype.selectHour = function (hour) {
        this.check_2 = true;
        this.final_data.id_con = hour.id_con;
        this.final_data.hor_con = hour.hor_con;
        this.final_date_format = moment(this.final_data.fecha + ' ' + hour.hor_con).format('LL');
        this.clearHour(hour.id_con);
    };
    AppointmentDatePage.prototype.clearHour = function (id) {
        try {
            var elem_selected = document.getElementById('h-' + id);
            elem_selected.setAttribute("style", "background-color: #230084; color: #ffffff;");
            for (var _i = 0, _a = this.horas; _i < _a.length; _i++) {
                var item = _a[_i];
                try {
                    if (item.id_con !== id) {
                        var elem = document.getElementById('h-' + item.id_con);
                        elem.setAttribute("style", "background-color: #fff; color: #333;");
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
    AppointmentDatePage.prototype.goNext = function () {
        console.log(this.final_data);
        this.storage.setParams('params', this.final_data);
        this.navCtrl.navigateForward('appointment-checkout');
    };
    AppointmentDatePage.prototype.goEmergency = function () {
        this.navCtrl.navigateForward("emergency");
    };
    AppointmentDatePage = tslib_1.__decorate([
        Component({
            selector: 'app-appointment-date',
            templateUrl: './appointment-date.page.html',
            styleUrls: ['./appointment-date.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService,
            LoadingController,
            NavController,
            StorageService])
    ], AppointmentDatePage);
    return AppointmentDatePage;
}());
export { AppointmentDatePage };
//# sourceMappingURL=appointment-date.page.js.map