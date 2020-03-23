import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OccupationalExamCheckPage } from './occupational-exam-check.page';
var routes = [
    {
        path: '',
        component: OccupationalExamCheckPage
    }
];
var OccupationalExamCheckPageModule = /** @class */ (function () {
    function OccupationalExamCheckPageModule() {
    }
    OccupationalExamCheckPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OccupationalExamCheckPage]
        })
    ], OccupationalExamCheckPageModule);
    return OccupationalExamCheckPageModule;
}());
export { OccupationalExamCheckPageModule };
//# sourceMappingURL=occupational-exam-check.module.js.map