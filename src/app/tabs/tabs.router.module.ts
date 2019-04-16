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
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: '../pages/home/home.module#HomePageModule'
      },
      {
        path: 'deals',
        loadChildren: '../pages/deals/deals.module#DealsPageModule'
      },
      {
        path: 'cart',
        loadChildren: '../pages/cart/cart.module#CartPageModule'
      },
      {
        path: 'fooditems',
        loadChildren: '../pages/fooditems/fooditems.module#FooditemsPageModule'
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
