import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
var PaymentService = /** @class */ (function () {
    function PaymentService(http, events) {
        var _this = this;
        this.http = http;
        this.events = events;
        document.addEventListener('payment_event', function (token) {
            var token_id = token.detail;
            _this.events.publish('get_token', token_id);
        }, false);
    }
    PaymentService.prototype.initCulqi = function () {
        // Ingresa tu "Puclic Key" que te da Culqi aqui
        Culqi.publicKey = 'pk_test_yycfYRkVXy5z38km';
    };
    PaymentService.prototype.cfgFormulario = function (descripcion, cantidad) {
        Culqi.settings({
            title: 'Clinica Peruano Suiza',
            currency: 'PEN',
            description: descripcion,
            amount: cantidad
        });
    };
    PaymentService.prototype.open = function () {
        Culqi.open();
    };
    PaymentService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Events])
    ], PaymentService);
    return PaymentService;
}());
export { PaymentService };
//# sourceMappingURL=payment.service.js.map