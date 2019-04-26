import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.page.html',
  styleUrls: ['./datenschutz.page.scss'],
})
export class DatenschutzPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goback(){
    this.router.navigate(['/about-us']);
  }

}
