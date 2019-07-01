import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeDoctorPage } from './home-doctor.page';
var routes = [
    {
        path: '',
        component: HomeDoctorPage
    }
];
var HomeDoctorPageModule = /** @class */ (function () {
    function HomeDoctorPageModule() {
    }
    HomeDoctorPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HomeDoctorPage]
        })
    ], HomeDoctorPageModule);
    return HomeDoctorPageModule;
}());
export { HomeDoctorPageModule };
//# sourceMappingURL=home-doctor.module.js.map