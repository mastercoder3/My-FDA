import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {

  deals: Array<any>= [];

  constructor(private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.api.getAllDeals()
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res =>{
        this.deals = res;
      })
  }

  data;

  addToCart(item){
    this.data = item;
    let func = () =>{
      //do nothing 
      console.log('cancel')
      return;
    }
    let func1= ()=>{
      this.cart();
    }
    this.helper.presentAlert('Zu Warenkorb','Möchten Sie es zu Warenkorb hinzufügen.',func,func1);
  }

  cart(){
    let price = this.data.price;
        let order = {
        imageURL: this.data.imageURL ? this.data.imageURL : 'assets/imgs/pepperpizza.png',
        itemTitle: this.data.title,
        itemIngredients: this.data.items,
        quantity: 1,
        size: '',
        price: price ? price : 0,
        extras: [],
        type: 'Deal'
      }

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
