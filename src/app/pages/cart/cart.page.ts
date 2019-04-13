import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart:Array<any>;
  total: number = 0;
  constructor(private router: Router, private helper: HelperService) { }

  ngOnInit() {
    this.helper.getCart().subscribe(res =>{
      this.cart = res;
      console.log(this.cart)
      this.setTotal();
    });
  }

  setTotal(){
    this.total = 0;
    this.cart.forEach(a =>{
      this.total += a.price;
    })
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
    this.router.navigate(['/fooddetails']);
  }
}
