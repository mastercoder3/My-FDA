import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  terms = false;
  zips;
  cart;
  total: number = 0;
  data;
  flagTotal: number = 0;
  delCharges  =0 ;

  constructor(private router: Router, private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.getData();
    this.helper.getCart().subscribe(res =>{
      this.cart = res;
      this.setTotal();
    });
    this.data = {
      name: '',
      email: '',
      address: '',
      notes: '',
      code: '',
      date: '',
      phone: '',
      orderType: 'Delivery',
      total: 0
    }
  }

  setTotal(){
    this.total = 0;
    this.cart.forEach(a =>{
      this.total += a.price;
    });
    let discountAmount = (5*this.total)/100;
    this.total -= discountAmount;
    this.flagTotal = this.total;
  }


  getData(){
    this.api.getAllZipCodes()
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return { did, ...data};
      })))
      .subscribe(res =>{
        this.zips = res;
      })
  }

  goback(){
    this.router.navigate(['cart']);
  }

  changeStatus(){
    if(this.terms){
      this.terms = false;
      this.data.orderType = 'Delivery'
      this.total = this.flagTotal + this.delCharges;
      this.data.total = this.total;
    }
    else{
      this.terms = true;
      this.data.orderType = 'Self Pickup'
      this.total = this.total - this.delCharges;
      this.data.total = this.data.total - this.delCharges;
    }
  }

  statusChange(event){
    if(!this.terms){
      this.data.orderType = 'Delivery'
      this.total = this.flagTotal + this.delCharges;
      this.data.total = this.total;
    }
    else{
      this.data.orderType = 'Self Pickup'
      this.total = this.total - this.delCharges;
      this.data.total = this.data.total - this.delCharges;
    }
  }

  order(){
    if(this.data.name !== '' &&
    this.data.email !== '' &&
    this.data.address !=='' &&
    this.data.phone !== '' &&
    this.data.date !== ''){
      if(!this.terms && this.data.code !== ''){
        this.data.orderDetails = this.cart;
        this.api.addToOrders(this.data)
          .then(res =>{
            this.cart = [];
            this.helper.setCart(this.cart);
            localStorage.setItem('cart',JSON.stringify(this.cart))
            this.helper.presentToast('Order Placed. Check your Email for Order details.');
            this.router.navigate(['tabs'])
          },err =>{
            this.helper.presentToast('Somthing went wrong!')
          })
      }
      else if(this.terms){
        this.data.code = '';
        this.data.orderDetails = this.cart;
        this.api.addToOrders(this.data)
          .then(res =>{
            this.cart = [];
            this.helper.setCart(this.cart);
            localStorage.setItem('cart',JSON.stringify(this.cart))
            this.helper.presentToast('Order Placed. Check your Email for Order details.');
            this.router.navigate(['tabs'])
          },err =>{
            this.helper.presentToast('Somthing went wrong!')
          })
      }
      else{
        this.helper.presentToast('Please Choose a Zip Code');
      }
    }
    else{
      this.helper.presentToast('Please Provide All information.');
    }
  }

  setNewPrice(event){
    let x: Array<any> = [];
    x = this.zips.filter(data => data.code === parseInt(event));
    if(x[0].minOrder < this.flagTotal)
      {
        this.total = this.flagTotal + x[0].rate; 
        this.delCharges = x[0].rate;
        this.data.total = this.total;
      }
    else{
      this.helper.presentToast(`Min order for delivery is ${x[0].minOrder}`);
      this.data.code = '';
    }

  }

}
