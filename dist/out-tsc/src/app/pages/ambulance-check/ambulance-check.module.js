import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AmbulanceCheckPage } from './ambulance-check.page';
var routes = [
    {
        path: '',
        component: AmbulanceCheckPage
    }
];
var AmbulanceCheckPageModule = /** @class */ (function () {
    function AmbulanceCheckPageModule() {
    }
    AmbulanceCheckPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AmbulanceCheckPage]
        })
    ], AmbulanceCheckPageModule);
    return AmbulanceCheckPageModule;
}());
export { AmbulanceCheckPageModule };
//# sourceMappingURL=ambulance-check.module.js.map