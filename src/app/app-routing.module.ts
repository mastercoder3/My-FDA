import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: './home/home.module#HomePageModule'
  // },
  // {
  //   path: 'list',
  //   loadChildren: './list/list.module#ListPageModule'
  // },
  // { path: 'deals', loadChildren: './pages/deals/deals.module#DealsPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
   { path: 'fooditems', loadChildren: './pages/fooditems/fooditems.module#FooditemsPageModule' },
  { path: 'fooddetails', loadChildren: './pages/fooddetails/fooddetails.module#FooddetailsPageModule' },
  // { path: 'info', loadChildren: './pages/info/info.module#InfoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
