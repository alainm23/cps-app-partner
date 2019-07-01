import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TrainingsPage } from './trainings.page';
var routes = [
    {
        path: '',
        component: TrainingsPage
    }
];
var TrainingsPageModule = /** @class */ (function () {
    function TrainingsPageModule() {
    }
    TrainingsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TrainingsPage]
        })
    ], TrainingsPageModule);
    return TrainingsPageModule;
}());
export { TrainingsPageModule };
//# sourceMappingURL=trainings.module.js.map