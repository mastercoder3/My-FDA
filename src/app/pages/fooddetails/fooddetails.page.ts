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
  addon: Array<any>  [];
  quantity:number = 1;
  size;
  basePrice: number;
  constructor(public modalController: ModalController, private helper:HelperService, private router: Router, private actived: ActivatedRoute) { }

  ngOnInit() {
    this.actived.params.subscribe(res =>{
      this.product = JSON.parse(res.data);
      this.type = res.type;
      if(this.type === 'pizza')
        this.image = 'assets/imgs/cartpizza.png';
    })
  }
  openModal(){
    this.helper.presentModal(this.type, this.addon).then(res =>{
      this.helper.modalGotClosed().then(ress =>{
        if(ress.data)
          this.addon = ress.data.addon;
      })
    })
  }
  goback(){
    this.router.navigate(['/fooditems']);
  }

  sizeChanged(event,price){
    this.size = event;
    this.basePrice = price;
  }

  cart(){
    // this.router.navigate(['cart']);
    if(this.size){
        let order = {
        imageURL: this.product.imageURL ? this.product.imageURL : this.image,
        itemTitle: this.product.title,
        itemIngredients: this.product.ingredients,
        quantity: this.quantity,
        size: this.size,
        price: 0,
        extras: []
      }
      this.calculatePrice();
    }
    else{
      this.helper.presentToast('Please Select a Size.')
    }
    
  }

  calculatePrice(){
    let price = this.basePrice * this.quantity;
    console.log(this.addon);
  }

  addToQuantity(){
    this.quantity++;
  }

  removeFromQuantity(){
    if(this.quantity - 1 !== 0)
      this.quantity--;
  }
}
