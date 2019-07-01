import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AmbulancePage } from './ambulance.page';
var routes = [
    {
        path: '',
        component: AmbulancePage
    }
];
var AmbulancePageModule = /** @class */ (function () {
    function AmbulancePageModule() {
    }
    AmbulancePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AmbulancePage]
        })
    ], AmbulancePageModule);
    return AmbulancePageModule;
}());
export { AmbulancePageModule };
//# sourceMappingURL=ambulance.module.js.map