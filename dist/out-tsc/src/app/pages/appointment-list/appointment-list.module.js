import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppointmentListPage } from './appointment-list.page';
var routes = [
    {
        path: '',
        component: AppointmentListPage
    }
];
var AppointmentListPageModule = /** @class */ (function () {
    function AppointmentListPageModule() {
    }
    AppointmentListPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AppointmentListPage]
        })
    ], AppointmentListPageModule);
    return AppointmentListPageModule;
}());
export { AppointmentListPageModule };
//# sourceMappingURL=appointment-list.module.js.map