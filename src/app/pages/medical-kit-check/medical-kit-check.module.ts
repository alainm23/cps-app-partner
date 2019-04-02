import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MedicalKitCheckPage } from './medical-kit-check.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalKitCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MedicalKitCheckPage]
})
export class MedicalKitCheckPageModule {}
