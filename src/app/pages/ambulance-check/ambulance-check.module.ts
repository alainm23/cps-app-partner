import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AmbulanceCheckPage } from './ambulance-check.page';

const routes: Routes = [
  {
    path: '',
    component: AmbulanceCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmbulanceCheckPage]
})
export class AmbulanceCheckPageModule {}
