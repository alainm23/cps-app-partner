import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EmergencyPage } from './emergency.page';
var routes = [
    {
        path: '',
        component: EmergencyPage
    }
];
var EmergencyPageModule = /** @class */ (function () {
    function EmergencyPageModule() {
    }
    EmergencyPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EmergencyPage]
        })
    ], EmergencyPageModule);
    return EmergencyPageModule;
}());
export { EmergencyPageModule };
//# sourceMappingURL=emergency.module.js.map