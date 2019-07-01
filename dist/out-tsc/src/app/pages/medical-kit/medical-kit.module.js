import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MedicalKitPage } from './medical-kit.page';
var routes = [
    {
        path: '',
        component: MedicalKitPage
    }
];
var MedicalKitPageModule = /** @class */ (function () {
    function MedicalKitPageModule() {
    }
    MedicalKitPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MedicalKitPage]
        })
    ], MedicalKitPageModule);
    return MedicalKitPageModule;
}());
export { MedicalKitPageModule };
//# sourceMappingURL=medical-kit.module.js.map