import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VisitsPage } from './visits.page';
var routes = [
    {
        path: '',
        component: VisitsPage
    }
];
var VisitsPageModule = /** @class */ (function () {
    function VisitsPageModule() {
    }
    VisitsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [VisitsPage]
        })
    ], VisitsPageModule);
    return VisitsPageModule;
}());
export { VisitsPageModule };
//# sourceMappingURL=visits.module.js.map