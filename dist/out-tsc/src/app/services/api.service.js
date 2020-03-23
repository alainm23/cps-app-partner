import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.API = "https://api.cps.com.pe/api";
    }
    ApiService.prototype.getEspecialidades = function () {
        var url = this.API + "/getespecialidades/es";
        return this.http.get(url);
    };
    ApiService.prototype.getCitasEspecialidad = function (name) {
        var url = this.API + "/getcitasespecialidad/" + name;
        return this.http.get(url);
    };
    ApiService.prototype.getHorariosFecha = function (medico_id, date) {
        var url = this.API + '/gethorariosfecha/' + medico_id + '/' + date;
        return this.http.get(url);
    };
    ApiService.prototype.sendMessage = function (data) {
        var url = this.API + "/enviaremergenciaapp";
        return this.http.post(url, data);
    };
    ApiService.prototype.procesarPago = function (data) {
        var url = "https://api.cps.com.pe/api/procesarpagoapp/";
        url += data.token + "/";
        url += data.monto + "/";
        url += data.correo + "/";
        url += data.moneda + "/";
        url += data.des + "/";
        url += data.consulta + "/";
        url += data.doctor;
        console.log("URL: " + url);
        return this.http.get(url);
    };
    ApiService.prototype.procesarPago2 = function (data) {
        var url = "https://api.cps.com.pe/api/procesarpago2app/";
        url += data.token + "/";
        url += data.monto + "/";
        url += data.correo + "/";
        url += data.moneda + "/";
        url += data.des;
        console.log(url);
        return this.http.get(url);
    };
    ApiService.prototype.checkoutapp = function (data) {
        var url = "https://api.cps.com.pe/api/checkoutapp";
        return this.http.post(url, data);
    };
    ApiService.prototype.pushNotification = function (data) {
        var url = "https://api.cps.com.pe/api/send-notification";
        return this.http.post(url, data);
    };
    ApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map