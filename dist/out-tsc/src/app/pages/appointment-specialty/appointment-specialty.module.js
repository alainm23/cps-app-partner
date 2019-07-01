import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppointmentSpecialtyPage } from './appointment-specialty.page';
var routes = [
    {
        path: '',
        component: AppointmentSpecialtyPage
    }
];
var AppointmentSpecialtyPageModule = /** @class */ (function () {
    function AppointmentSpecialtyPageModule() {
    }
    AppointmentSpecialtyPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AppointmentSpecialtyPage]
        })
    ], AppointmentSpecialtyPageModule);
    return AppointmentSpecialtyPageModule;
}());
export { AppointmentSpecialtyPageModule };
//# sourceMappingURL=appointment-specialty.module.js.map