import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goback(){
    this.router.navigate(['/about-us']);
  }

}
