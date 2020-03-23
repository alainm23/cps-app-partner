import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SelectCountriesPage } from './select-countries.page';
var routes = [
    {
        path: '',
        component: SelectCountriesPage
    }
];
var SelectCountriesPageModule = /** @class */ (function () {
    function SelectCountriesPageModule() {
    }
    SelectCountriesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SelectCountriesPage]
        })
    ], SelectCountriesPageModule);
    return SelectCountriesPageModule;
}());
export { SelectCountriesPageModule };
//# sourceMappingURL=select-countries.module.js.map