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
      this.helper.presentToast('Please Accept Terms and Conditions.');
  }

  changeStatus(){
    if(this.terms)
      this.terms = false;
    else
      this.terms = true;
  }

  show = false;

  // checkTimings(){
  //   const Today = new Date();
  //   let day = Today.getDay();
  //   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   //check daily times
  //   this.timings.forEach(a =>{

  //     if(a.did === 'daily'){
  //       let times = a.timings;
  //       let x = times.filter(data => data.day === days[day]);
  //       if(x.length >0 ){
  //         let currentTime = Today.getHours()+':'+Today.getMinutes();
  //         if(currentTime >= x[0].from && currentTime < x[0].to){
  //           if(currentTime >= x[0].breakFrom && currentTime < x[0].breakTo){
  //             if(!this.show){
  //               this.helper.presentToastModal();
  //               this.show = true;
  //             }
  //             this.closed = true;
  //           }
  //           else{
  //             if(x[0].status === 'close'){
  //               this.closed = false;
  //             }
  //             else{
  //               if(!this.show){
  //                 this.helper.presentToastModal();
  //                 this.show = true;
  //               }
  //               this.closed=true;
  //             }
  //           }
  //         }
  //         else{
  //           if(!this.show){
  //             this.helper.presentToastModal();
  //             this.show = true;
  //           }
  //           this.closed=true;
  //         }
  //       }
  //     }
  //     if(a.did === 'special'){
  //       let date = a.timings;
  //       let today = `${Today.getFullYear()}-${(Today.getMonth()+1) < 10 ? ('0'+(Today.getMonth()+1)) : (Today.getMonth()+1)}-${(Today.getDate() < 10) ? ('0'+(Today.getDate())) : Today.getDate()}`;
  //       let x = date.filter(data => data.date === today && data.status === 'close')
  //       if(x.length > 0){
  //         if(!this.show){
  //           this.helper.presentToastModal();
  //           this.show = true;
  //         }
  //         this.closed=true;
  //       }
  //       x = date.filter(data => data.date === today && data.status === 'open');
  //       if(x.length>0){
  //         let currentTime = Today.getHours()+':'+Today.getMinutes();
  //         if(currentTime >= x[0].from && currentTime < x[0].to)
  //           this.closed =false;
  //         else{
  //           if(!this.show){
  //             this.helper.presentToastModal();
  //             this.show = true;
  //           }
  //           this.closed=true;
  //         }
  //       }
  //     }

  //   });
  //   this.show = false;
  // }
}
