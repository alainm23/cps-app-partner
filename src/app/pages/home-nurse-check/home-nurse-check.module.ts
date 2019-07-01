import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeNurseCheckPage } from './home-nurse-check.page';

const routes: Routes = [
  {
    path: '',
    component: HomeNurseCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeNurseCheckPage]
})
export class HomeNurseCheckPageModule {}
