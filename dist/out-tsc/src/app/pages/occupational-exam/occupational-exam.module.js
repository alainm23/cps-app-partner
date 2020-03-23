import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OccupationalExamPage } from './occupational-exam.page';
var routes = [
    {
        path: '',
        component: OccupationalExamPage
    }
];
var OccupationalExamPageModule = /** @class */ (function () {
    function OccupationalExamPageModule() {
    }
    OccupationalExamPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OccupationalExamPage]
        })
    ], OccupationalExamPageModule);
    return OccupationalExamPageModule;
}());
export { OccupationalExamPageModule };
//# sourceMappingURL=occupational-exam.module.js.map