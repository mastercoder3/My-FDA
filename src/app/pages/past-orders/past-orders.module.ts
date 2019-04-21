import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PastOrdersPage } from './past-orders.page';
import {AccordionModule} from "ngx-accordion";

const routes: Routes = [
  {
    path: '',
    component: PastOrdersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PastOrdersPage]
})
export class PastOrdersPageModule {}
