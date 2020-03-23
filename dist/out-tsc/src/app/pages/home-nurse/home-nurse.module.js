import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeNursePage } from './home-nurse.page';
var routes = [
    {
        path: '',
        component: HomeNursePage
    }
];
var HomeNursePageModule = /** @class */ (function () {
    function HomeNursePageModule() {
    }
    HomeNursePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HomeNursePage]
        })
    ], HomeNursePageModule);
    return HomeNursePageModule;
}());
export { HomeNursePageModule };
//# sourceMappingURL=home-nurse.module.js.map