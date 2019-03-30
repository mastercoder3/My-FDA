import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fooddetails',
  templateUrl: './fooddetails.page.html',
  styleUrls: ['./fooddetails.page.scss'],
})
export class FooddetailsPage implements OnInit {

  constructor(public modalController: ModalController, private helper:HelperService, private router: Router) { }

  ngOnInit() {
  }
  openModal(){
    this.helper.presentModal() 
  }
  goback(){
    this.router.navigate(['/fooditems']);
  }
  cart(){
    this.router.navigate(['cart']);
  }
}
