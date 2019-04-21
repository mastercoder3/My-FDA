import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  info(){
    this.menuCtrl.close();
    this.router.navigate(['info'])
  }

  home(){
    this.menuCtrl.close();
    this.router.navigate(['/tabs/home'])
  }

  order(){
    this.menuCtrl.close();
    this.router.navigate(['/past-orders'])
  }

  about(){
    this.menuCtrl.close();
    this.router.navigate(['/about-us'])
  }
}
