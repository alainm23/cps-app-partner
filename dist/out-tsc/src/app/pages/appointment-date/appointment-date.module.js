import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppointmentDatePage } from './appointment-date.page';
var routes = [
    {
        path: '',
        component: AppointmentDatePage
    }
];
var AppointmentDatePageModule = /** @class */ (function () {
    function AppointmentDatePageModule() {
    }
    AppointmentDatePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AppointmentDatePage]
        })
    ], AppointmentDatePageModule);
    return AppointmentDatePageModule;
}());
export { AppointmentDatePageModule };
//# sourceMappingURL=appointment-date.module.js.map