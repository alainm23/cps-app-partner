import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppointmentDetailsPage } from './appointment-details.page';
var routes = [
    {
        path: '',
        component: AppointmentDetailsPage
    }
];
var AppointmentDetailsPageModule = /** @class */ (function () {
    function AppointmentDetailsPageModule() {
    }
    AppointmentDetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AppointmentDetailsPage]
        })
    ], AppointmentDetailsPageModule);
    return AppointmentDetailsPageModule;
}());
export { AppointmentDetailsPageModule };
//# sourceMappingURL=appointment-details.module.js.map