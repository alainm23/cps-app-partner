import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OxygenRechargeCheckPage } from './oxygen-recharge-check.page';

const routes: Routes = [
  {
    path: '',
    component: OxygenRechargeCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OxygenRechargeCheckPage]
})
export class OxygenRechargeCheckPageModule {}
