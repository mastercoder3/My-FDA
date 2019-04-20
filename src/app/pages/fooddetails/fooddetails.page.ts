import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fooddetails',
  templateUrl: './fooddetails.page.html',
  styleUrls: ['./fooddetails.page.scss'],
})
export class FooddetailsPage implements OnInit {

  image: string;
  product;
  type;
  addon: Array<any> = [];
  quantity:number = 1;
  size;
  basePrice: number;
  extras = [];
  clicked = false;
  cartItems;

  constructor(public modalController: ModalController, private helper:HelperService, private router: Router, private actived: ActivatedRoute) { }

  ngOnInit() {
    this.helper.getData().subscribe(data =>{
      this.helper.getType().subscribe(type =>{
        this.type = type;
        this.product = data;
        if(this.type === 'pizza')
        this.image = 'assets/imgs/cartpizza.png';
      else if(this.type === 'pasta'){
        this.image = 'assets/imgs/pasta.png';
        this.size = this.product.size;
        this.basePrice = this.product.price;
      }
      else if(this.type === 'salad'){
        this.image = 'assets/imgs/Salad.png';
        this.size = this.product.size;
        this.basePrice = this.product.price;
      }
      else if(this.type === 'appetizers'){
        this.image = 'assets/imgs/appetizers.png';
        this.size = this.product.size;
        this.basePrice = this.product.price;
      }
      else if(this.type === 'desserts'){
        this.image = 'assets/imgs/desserts.png';
        this.size = this.product.size;
        this.basePrice = this.product.price;
      }
      else if(this.type === 'beverages'){
        this.image = 'assets/imgs/beverages.png';
        this.size = this.product.size;
        this.basePrice = this.product.price;
      }

      });
    })
    // this.product = JSON.parse(localStorage.getItem('data'));
    // this.type = localStorage.getItem('type');
   
    this.helper.getCart().subscribe(res =>{
      if(res.length === 0){
        this.cartItems = ''
      }
      else
        this.cartItems = res.length;
    })
  }
  openModal(){
    this.clicked = true;
    if(this.clicked === true){
      this.helper.presentModal(this.type, this.addon).then(res =>{
        this.helper.modalGotClosed().then(ress =>{
          if(ress.data)
            this.addon = ress.data.addon;
            this.clicked = false;
        })
      });
      this.clicked = false;
    }

  }
  goback(){
    this.router.navigate(['/fooditems', {
      type: this.type
    }]);
  }

  sizeChanged(event,price){
    this.size = event;
    this.basePrice = price;
  }

  cart(){

    if(this.size){
        let price = this.calculatePrice();
        let order = {
        imageURL: this.product.imageURL ? this.product.imageURL : this.image,
        itemTitle: this.product.title,
        itemIngredients: this.product.ingredients,
        quantity: this.quantity,
        size: this.size,
        price: price ? price : 0,
        extras: this.extras
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
      this.helper.presentToast('Item Added to Cart.');
      this.router.navigate(['/tabs/cart'])
    }
    else{
      this.helper.presentToast('Please Select a Size.')
    }
    
  }

  calculatePrice(){
    let price = this.basePrice * this.quantity;
    let addonPrice = 0;
    this.extras = [];
    if(this.addon.length > 0){
      for(let i = 0; i < this.addon.length; i++){
        let currentPrice = this.addon[i].price;
        let items = this.addon[i].items;
        let itemPrice = 0;
          for(let j = 0; j < items.length; j++){
              itemPrice = itemPrice + (currentPrice * items[j].quantity);
              this.extras.push(`${items[j].quantity}x ${items[j].text}`)
          }
        addonPrice += itemPrice;
      }
      
      price += addonPrice;
      return price;
    }
    else{
      return price;
    }
  }

  addToQuantity(){
    this.quantity++;
  }

  removeFromQuantity(){
    if(this.quantity - 1 !== 0)
      this.quantity--;
  }

  openCart(){
    localStorage.setItem('lastURL',this.router.url)
    this.router.navigate(['cart']);
  }
}
