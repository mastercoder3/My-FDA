import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
   { path: 'fooditems', loadChildren: './pages/fooditems/fooditems.module#FooditemsPageModule' },
  { path: 'fooddetails', loadChildren: './pages/fooddetails/fooddetails.module#FooddetailsPageModule' },
  { path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutPageModule' },
  { path: 'info', loadChildren: './pages/info/info.module#InfoPageModule' },  { path: 'past-orders', loadChildren: './pages/past-orders/past-orders.module#PastOrdersPageModule' },
  { path: 'about-us', loadChildren: './pages/about-us/about-us.module#AboutUsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
