import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
   { path: 'fooditems', loadChildren: './pages/fooditems/fooditems.module#FooditemsPageModule' },
  { path: 'fooddetails', loadChildren: './pages/fooddetails/fooddetails.module#FooddetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
