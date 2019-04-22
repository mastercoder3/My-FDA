import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  codeArea='';
  discount; 
  datePlaceholder='';
  today;
  timings;

  constructor(private router: Router, private api: ApiService, private helper: HelperService, private route: ActivatedRoute) { }

  ngOnInit() {
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
    this.getData();
    this.helper.getCart().subscribe(res =>{
      this.cart = res;
     this.route.params.subscribe(res =>{
       if(res.discount){
        this.discount = parseFloat(res.discount);
        this.setTotal();}
        else
        this.setTotal();
     })
      
    });

    this.setDatePlaceholder();
  }

  setDatePlaceholder(){
    const Today = new Date();
    let today = `${Today.getFullYear()}-${(Today.getMonth()+1) < 10 ? ('0'+(Today.getMonth()+1)) : (Today.getMonth()+1)}-${(Today.getDate() < 10) ? ('0'+(Today.getDate())) : Today.getDate()}`;
    this.today = today;
    today = today + `T${Today.getHours()<10 ? ('0'+Today.getHours()) : Today.getHours()}:${Today.getMinutes()< 10 ? ('0'+Today.getMinutes()) : Today.getMinutes()}`;
    this.data.date = today;
  }

  setTotal(){
    this.total = 0;
    this.cart.forEach(a =>{
      this.total += a.price;
    });
    if(this.discount){
      this.total -= this.discount;
      this.flagTotal = this.total;
    }
    else{
      this.flagTotal = this.total;
    }

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
      });

      this.api.getTimings()
      .pipe(map(actions => actions.map(a=>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res =>{
        this.timings = res;
        this.checkTimings();
      })
  }

  goback(){
    this.router.navigate(['/tabs/cart']);
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
      this.data.orderType = 'Self Pickup';
      this.total = this.total - this.delCharges;
      this.data.total = this.total - this.delCharges;
    }
  }

  statusChange(event?){
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
    if(this.data.date.substr(0,this.data.date.indexOf('T')) < this.today){
      this.helper.presentToast('Invalid Date, Please Choose again.');
    }
    else{
      this.checkTimings(this.data.date,1);
      if(this.closed){
        return;
      }
      else{
                if(this.data.name !== '' &&
            this.data.email !== '' &&
            this.data.address !=='' &&
            this.data.phone !== '' &&
            this.data.voucher !=='' &&
            this.data.date !== ''){
              if(!this.terms && this.data.code !== ''){
                this.data.code = this.data.code + ` (${this.codeArea})`;
                this.data.orderDetails = this.cart;
                this.data.discount = this.discount ? this.discount : 0;
                this.data.deliveryFee = this.delCharges ? this.delCharges : 0;
                this.api.addToOrders(this.data)
                  .then(res =>{
                    this.cart = [];
                    this.helper.setCart(this.cart);
                    localStorage.setItem('cart',JSON.stringify(this.cart))
                    this.helper.presentToast('Order Placed. Check your Email for Order details.');
                    this.router.navigate(['tabs']);
                    this.setOrderHistory();
                    
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
                    this.setOrderHistory();
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
    }
    
  }

  setOrderHistory(){
    if(localStorage.getItem('pastOrder')){
      let x = JSON.parse(localStorage.getItem('pastOrder'));
      x.push(this.data);
      localStorage.setItem('pastOrder',JSON.stringify(x));
      this.helper.setHistory(x);
    }
    else{
      let x: Array<any> = [];
      x.push(this.data);
      localStorage.setItem('pastOrder',JSON.stringify(x));
      this.helper.setHistory(x);
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
        this.codeArea = x[0].area;
      }
    else{
      this.helper.presentToast(`Min order for delivery is ${x[0].minOrder}`);
      this.data.code = '';
    }

  }

  show=false;
  closed=false;

  checkTimings(val?,type?){
    this.closed = false;
    this.show = false;
    let Today : Date;
    let t = 0;
    if(type)
      t = type;
    else
      t = 2;
    if(val)
      Today= new Date(val);
    else
      Today = new Date();
    let day = Today.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //check daily times
    this.timings.forEach(a =>{

      if(a.did === 'daily'){
        let times = a.timings;
        let x = times.filter(data => data.day === days[day]);
        if(x.length >0 ){
          let currentTime = `${Today.getHours()<10 ? ('0'+Today.getHours()) : Today.getHours()}:${Today.getMinutes()< 10 ? ('0'+Today.getMinutes()) : Today.getMinutes()}`;
          if(currentTime >= x[0].from && currentTime < x[0].to){
            if(currentTime >= x[0].breakFrom && currentTime < x[0].breakTo){
              if(!this.show){
                this.helper.presentToastModal(t);
                this.show = true;
              }
              this.closed = true;
            }
            else{
              if(x[0].status === 'close'){
                this.closed = true;
                if(!this.show){
                  this.helper.presentToastModal(t);
                  this.show = true;
                }
              }
              else{
                this.closed=false;
              }
            }
          }
          else{
            if(!this.show){
              this.helper.presentToastModal(t);
              this.show = true;
            }
            this.closed=true;
          }
        }
      }
      if(a.did === 'special'){
        let date = a.timings;
        let today = `${Today.getFullYear()}-${(Today.getMonth()+1) < 10 ? ('0'+(Today.getMonth()+1)) : (Today.getMonth()+1)}-${(Today.getDate() < 10) ? ('0'+(Today.getDate())) : Today.getDate()}`;
        let x = date.filter(data => data.date === today && data.status === 'close')
        if(x.length > 0){
          if(!this.show){
            this.helper.presentToastModal(t);
            this.show = true;
          }
          this.closed=true;
        }
        x = date.filter(data => data.date === today && data.status === 'open');
        if(x.length>0){
          let currentTime = Today.getHours()+':'+Today.getMinutes();
          if(currentTime >= x[0].from && currentTime < x[0].to)
            this.closed =false;
          else{
            if(!this.show){
              this.helper.presentToastModal(t);
              this.show = true;
            }
            this.closed=true;
          }
        }
      }

    });
    this.show = false;
  }

}
