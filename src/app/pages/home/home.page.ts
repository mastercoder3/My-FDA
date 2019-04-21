import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FcmService } from 'src/app/services/fcm.service';
import { tap } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ApiService } from 'src/app/services/api.service';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categories;


  constructor(private router: Router, private api: ApiService,
    private platform: Platform, public fcm: FcmService, private localNotifications: LocalNotifications) {
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
      })
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
