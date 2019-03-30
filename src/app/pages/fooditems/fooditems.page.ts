import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.page.html',
  styleUrls: ['./fooditems.page.scss'],
})
export class FooditemsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  fooddetails(){
    this.router.navigate(['/fooddetails']);
  }
  goback(){
    this.router.navigate(['../']);
  }
}
