import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  timings;
  days= ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
  daily;
  special;
  specialTiming: Array<any>;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.api.getTimings()
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res =>{
        this.timings = res;
        this.daily = this.timings.filter(data => data.did === 'daily');
        this.special = this.timings.filter(data => data.did === 'special');
        this.checkTiming();
      });
  }

  checkTiming(){
    let timing = this.special[0].timings;
    const Today = new Date();
    let today = `${Today.getFullYear()}-${(Today.getMonth()+1) < 10 ? ('0'+(Today.getMonth()+1)) : (Today.getMonth()+1)}-${(Today.getDate() < 10) ? ('0'+(Today.getDate())) : Today.getDate()}`;
    let x = timing.filter(data => data.date === today);
    this.specialTiming =x;
  }

  goback(){
// tslint:disable-next-line: no-unused-expression
    this.router.navigate[('/home')];
  }
}
