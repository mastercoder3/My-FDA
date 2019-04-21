import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { database } from 'firebase';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.page.html',
  styleUrls: ['./past-orders.page.scss'],
})
export class PastOrdersPage implements OnInit {

  orders: Array<any>;

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.helper.getHistory().subscribe(res =>{
      this.orders = res;
      console.log(res)
    });
  }

  extractDate(date: string){
    return date.substr(0,date.indexOf('T'));
  }

}
