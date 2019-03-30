import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'deals',
        loadChildren: '../pages/deals/deals.module#DealsPageModule'
      },
      {
        path: 'info',
        loadChildren: '../pages/info/info.module#InfoPageModule'
      }
    ],
    
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
