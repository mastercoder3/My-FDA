import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FcmService } from 'src/app/services/fcm.service';
import { tap } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, private platform: Platform, public fcm: FcmService, private localNotifications: LocalNotifications) {
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

  fooditem(val){
    this.router.navigate(['/tabs/fooditems', {
      type: val
    }]);
  }
}
