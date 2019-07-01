import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdsMaterialCheckPage } from './ads-material-check.page';
var routes = [
    {
        path: '',
        component: AdsMaterialCheckPage
    }
];
var AdsMaterialCheckPageModule = /** @class */ (function () {
    function AdsMaterialCheckPageModule() {
    }
    AdsMaterialCheckPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AdsMaterialCheckPage]
        })
    ], AdsMaterialCheckPageModule);
    return AdsMaterialCheckPageModule;
}());
export { AdsMaterialCheckPageModule };
//# sourceMappingURL=ads-material-check.module.js.map