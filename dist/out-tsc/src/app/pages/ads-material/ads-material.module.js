import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdsMaterialPage } from './ads-material.page';
var routes = [
    {
        path: '',
        component: AdsMaterialPage
    }
];
var AdsMaterialPageModule = /** @class */ (function () {
    function AdsMaterialPageModule() {
    }
    AdsMaterialPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AdsMaterialPage]
        })
    ], AdsMaterialPageModule);
    return AdsMaterialPageModule;
}());
export { AdsMaterialPageModule };
//# sourceMappingURL=ads-material.module.js.map