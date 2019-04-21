import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  cartItems;

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.helper.getCart().subscribe(res =>{
      if(res.length === 0){
        this.cartItems = ''
      }
      else
        this.cartItems = res.length;
    })
  }

}
