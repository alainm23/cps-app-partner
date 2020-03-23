import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppointmentSpecialtyPage } from './appointment-specialty.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentSpecialtyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AppointmentSpecialtyPage]
})
export class AppointmentSpecialtyPageModule {}
