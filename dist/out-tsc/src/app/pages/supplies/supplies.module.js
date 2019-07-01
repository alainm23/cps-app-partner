import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SuppliesPage } from './supplies.page';
var routes = [
    {
        path: '',
        component: SuppliesPage
    }
];
var SuppliesPageModule = /** @class */ (function () {
    function SuppliesPageModule() {
    }
    SuppliesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SuppliesPage]
        })
    ], SuppliesPageModule);
    return SuppliesPageModule;
}());
export { SuppliesPageModule };
//# sourceMappingURL=supplies.module.js.map