import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart:Array<any>=[];
  total: number = 0;
  terms=false; 
  discount;
  discountAmount;
  timings;
  closed = false;

  constructor(private router: Router, private helper: HelperService, private api: ApiService) { }

  ngOnInit() {
    this.helper.getCart().subscribe(res =>{
      this.cart = res;
      this.api.getDiscountAmount()
        .subscribe(res =>{
          this.discount = res;
          this.setTotal();
        })
      
    });

    this.api.getTimings()
      .pipe(map(actions => actions.map(a=>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res =>{
        this.timings = res;
      })
  }

  setTotal(){
    this.total = 0;
    this.cart.forEach(a =>{
      this.total += a.price;
    });
    if(this.discount.amount > 0){
      this.discountAmount = (this.discount.amount*this.total)/100;
      this.total -= this.discountAmount;
    }

  }

  addToQuantity(i){
    let singlePrice = this.cart[i].price/this.cart[i].quantity;
    this.cart[i].quantity++;
    this.cart[i].price += singlePrice;
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.helper.setCart(this.cart);
  }

  removeFromQuantity(i){
    if(this.cart[i].quantity - 1 !== 0){
      let singlePrice = this.cart[i].price/this.cart[i].quantity;
      this.cart[i].quantity--;
      this.cart[i].price -= singlePrice;
      localStorage.setItem('cart',JSON.stringify(this.cart));
      this.helper.setCart(this.cart);
    }
      
  }

  delete(i){
    this.cart.splice(i,1);
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.helper.setCart(this.cart);
  }

  goback(){
    if(localStorage.getItem('lastURL')){
      this.router.navigate([localStorage.getItem('lastURL')]);
      localStorage.removeItem('lastURL')
    }

    else
      this.router.navigate(['tabs']);
  }

  checkout(){
    // this.checkTimings();
    // if(this.closed){
    //   return;
    // }
    if(this.terms){
      if(this.discountAmount)
        this.router.navigate(['checkout',{discount: this.discountAmount}]);
      else
      this.router.navigate(['checkout']);
    }
    else  
      this.helper.presentToast('Bitte akzeptieren Sie unsere allgemeine Geschäftsbedingungen');
  }

  changeStatus(){
    if(this.terms)
      this.terms = false;
    else
      this.terms = true;
  }

  show = false;

}
