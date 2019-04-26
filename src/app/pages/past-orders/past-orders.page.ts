import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { database } from 'firebase';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.page.html',
  styleUrls: ['./past-orders.page.scss'],
})
export class PastOrdersPage implements OnInit {

  orders: Array<any>;

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.helper.getHistory().subscribe(res =>{
      this.orders = res;
      console.log(res)
    });
  }

  extractDate(date: string){
    return date.substr(0,date.indexOf('T'));
  }

  clear(){
    this.helper.setHistory([]);
    localStorage.setItem('pastOrder',JSON.stringify([]));
  }

  reorder(item){
    console.log(item)
    let order = item.orderDetails[0];
    if(localStorage.getItem('cart')){
      let x = [];
      x = JSON.parse(localStorage.getItem('cart'));
      let check;
      check = x.findIndex(data => data.itemTitle === order.itemTitle && data.itemIngredients === order.itemIngredients
         && data.size === order.size && JSON.stringify(data.extras) === JSON.stringify(order.extras))
      if(check > -1){
        x[check].quantity += order.quantity;
        x[check].price = x[check].price + order.price;
      }
      else
        x.push(order);
      localStorage.setItem('cart',JSON.stringify(x));
      this.helper.setCart(x);
    }
    else{
      let x = [];
      x.push(order);
      localStorage.setItem('cart',JSON.stringify(x));
      this.helper.setCart(x);
    }
    this.helper.presentToast('In den Warenkorb hinzugefügt');
  }

}
