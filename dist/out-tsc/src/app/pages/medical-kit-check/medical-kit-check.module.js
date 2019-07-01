import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MedicalKitCheckPage } from './medical-kit-check.page';
var routes = [
    {
        path: '',
        component: MedicalKitCheckPage
    }
];
var MedicalKitCheckPageModule = /** @class */ (function () {
    function MedicalKitCheckPageModule() {
    }
    MedicalKitCheckPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MedicalKitCheckPage]
        })
    ], MedicalKitCheckPageModule);
    return MedicalKitCheckPageModule;
}());
export { MedicalKitCheckPageModule };
//# sourceMappingURL=medical-kit-check.module.js.map