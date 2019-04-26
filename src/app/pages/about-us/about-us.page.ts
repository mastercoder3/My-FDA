import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
  }

  call(number){
    this.callNumber.callNumber(number, true);
  }

}
