import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FcmService } from 'src/app/services/fcm.service';
import { tap } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ApiService } from 'src/app/services/api.service';
import {map} from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categories;
  timings;
  closed =false;
  show = false;

  constructor(private router: Router, private api: ApiService,
    private platform: Platform, public fcm: FcmService, private localNotifications: LocalNotifications, private helper: HelperService) {
    platform.ready().then(() => {

      // Get a FCM token
      fcm.getToken(localStorage.getItem('uid'))

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          
          this.localNotifications.schedule({
            id: 1,
            title: msg.title,
            text: msg.body           
          });
        })
      )
      .subscribe()
    });
  }

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.api.getAllCategories() 
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res =>{
        this.categories = res;
      });
    
    this.api.getTimings()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data};
    })))
    .subscribe(res =>{
      this.timings = res;
      this.checkClosing();
    });
  }

  checkClosing(){
    const Today = new Date();
    let day = Today.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //check daily times
    this.timings.forEach(a =>{

      if(a.did === 'daily'){
        let times = a.timings;
        let x = times.filter(data => data.day === days[day]);
        if(x.length >0 ){
          let currentTime = Today.getHours()+':'+Today.getMinutes();
          if(currentTime >= x[0].from && currentTime < x[0].to){
            if(currentTime >= x[0].breakFrom && currentTime < x[0].breakTo){
              if(!this.show){
                this.helper.presentToastModal();
                this.show = true;
              }
              this.closed = true;
            }
            else{
              if(x[0].status === 'close'){
                this.closed = false;
              }
              else{
                if(!this.show){
                  this.helper.presentToastModal();
                  this.show = true;
                }
                this.closed=true;
              }
            }
          }
          else{
            if(!this.show){
              this.helper.presentToastModal();
              this.show = true;
            }
            this.closed=true;
          }
        }
      }
      if(a.did === 'special'){
        let date = a.timings;
        let today = `${Today.getFullYear()}-${(Today.getMonth()+1) < 10 ? ('0'+(Today.getMonth()+1)) : (Today.getMonth()+1)}-${(Today.getDate() < 10) ? ('0'+(Today.getDate())) : Today.getDate()}`;
        let x = date.filter(data => data.date === today && data.status === 'close')
        if(x.length > 0){
          if(!this.show){
            this.helper.presentToastModal();
            this.show = true;
          }
          this.closed=true;
        }
        x = date.filter(data => data.date === today && data.status === 'open');
        if(x.length>0){
          let currentTime = Today.getHours()+':'+Today.getMinutes();
          if(currentTime >= x[0].from && currentTime < x[0].to)
            this.closed =false;
          else{
            if(!this.show){
              this.helper.presentToastModal();
              this.show = true;
            }
            this.closed=true;
          }
        }
      }

    });
    this.show = false;

  }

  fooditem(val,id?){
    if(id){
      this.router.navigate(['/tabs/fooditems', {
        type: val,
        catId: id.did,
        data: JSON.stringify(id)
      }]);
    }
    else
     this.router.navigate(['/tabs/fooditems', {
      type: val
    }]);
  }
}
