import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

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
    private menuCtrl: MenuController,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // let status bar overlay webview
      if(this.platform.is('ios'))
        this.statusBar.overlaysWebView(false);
      else
        this.statusBar.overlaysWebView(false);
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#be2222');
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
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
