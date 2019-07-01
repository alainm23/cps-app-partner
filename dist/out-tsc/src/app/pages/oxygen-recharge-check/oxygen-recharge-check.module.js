import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OxygenRechargeCheckPage } from './oxygen-recharge-check.page';
var routes = [
    {
        path: '',
        component: OxygenRechargeCheckPage
    }
];
var OxygenRechargeCheckPageModule = /** @class */ (function () {
    function OxygenRechargeCheckPageModule() {
    }
    OxygenRechargeCheckPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OxygenRechargeCheckPage]
        })
    ], OxygenRechargeCheckPageModule);
    return OxygenRechargeCheckPageModule;
}());
export { OxygenRechargeCheckPageModule };
//# sourceMappingURL=oxygen-recharge-check.module.js.map