import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdsMaterialCheckPage } from './ads-material-check.page';

const routes: Routes = [
  {
    path: '',
    component: AdsMaterialCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdsMaterialCheckPage]
})
export class AdsMaterialCheckPageModule {}
