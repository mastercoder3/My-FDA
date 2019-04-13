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

  product;
  type;

  constructor(public modalController: ModalController, private helper:HelperService, private router: Router, private actived: ActivatedRoute) { }

  ngOnInit() {
    this.actived.params.subscribe(res =>{
      this.product = JSON.parse(res.data);
      console.log(this.product)
      this.type = res.type;
    })
  }
  openModal(){
    this.helper.presentModal(this.type) 
  }
  goback(){
    this.router.navigate(['/fooditems']);
  }
  cart(){
    this.router.navigate(['cart']);
  }
}
