import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OccupationalExamCheckPage } from './occupational-exam-check.page';

const routes: Routes = [
  {
    path: '',
    component: OccupationalExamCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OccupationalExamCheckPage]
})
export class OccupationalExamCheckPageModule {}
