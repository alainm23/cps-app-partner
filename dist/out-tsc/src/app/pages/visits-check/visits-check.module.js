import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VisitsCheckPage } from './visits-check.page';
var routes = [
    {
        path: '',
        component: VisitsCheckPage
    }
];
var VisitsCheckPageModule = /** @class */ (function () {
    function VisitsCheckPageModule() {
    }
    VisitsCheckPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [VisitsCheckPage]
        })
    ], VisitsCheckPageModule);
    return VisitsCheckPageModule;
}());
export { VisitsCheckPageModule };
//# sourceMappingURL=visits-check.module.js.map