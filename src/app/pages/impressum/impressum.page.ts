import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.page.html',
  styleUrls: ['./impressum.page.scss'],
})
export class ImpressumPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goback(){
    this.router.navigate(['/about-us']);
  }

}
