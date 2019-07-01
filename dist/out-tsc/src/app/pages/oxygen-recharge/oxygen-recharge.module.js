import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OxygenRechargePage } from './oxygen-recharge.page';
var routes = [
    {
        path: '',
        component: OxygenRechargePage
    }
];
var OxygenRechargePageModule = /** @class */ (function () {
    function OxygenRechargePageModule() {
    }
    OxygenRechargePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OxygenRechargePage]
        })
    ], OxygenRechargePageModule);
    return OxygenRechargePageModule;
}());
export { OxygenRechargePageModule };
//# sourceMappingURL=oxygen-recharge.module.js.map