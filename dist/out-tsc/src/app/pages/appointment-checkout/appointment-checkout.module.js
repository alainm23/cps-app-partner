import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppointmentCheckoutPage } from './appointment-checkout.page';
var routes = [
    {
        path: '',
        component: AppointmentCheckoutPage
    }
];
var AppointmentCheckoutPageModule = /** @class */ (function () {
    function AppointmentCheckoutPageModule() {
    }
    AppointmentCheckoutPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AppointmentCheckoutPage]
        })
    ], AppointmentCheckoutPageModule);
    return AppointmentCheckoutPageModule;
}());
export { AppointmentCheckoutPageModule };
//# sourceMappingURL=appointment-checkout.module.js.map