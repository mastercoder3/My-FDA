import { Injectable } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  Mymodal
  cart: BehaviorSubject<Array<any>>;

  constructor( public modalController: ModalController, public toastController: ToastController, public alertController: AlertController) {
    if(localStorage.getItem('cart'))
      this.cart = new BehaviorSubject<Array<any>>(JSON.parse(localStorage.getItem('cart')))
    else
      this.cart = new BehaviorSubject<Array<any>>([]);  
  }

  setCart(value){
    this.cart.next(value);
  }

  getCart(){
    return this.cart.asObservable();
  }

  async presentModal(type, addon) {
    this.Mymodal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { type: type,
      addon: addon },
      cssClass: 'extrasModal'
    });
  
    return await this.Mymodal.present();
  }

 async modalGotClosed(){
    return await this.Mymodal.onDidDismiss();
  }

  closeModal(){
    this.Mymodal.dismiss()
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  async presentAlert(h,msg,func,func1) {
    const alert = await this.alertController.create({
      header: h,
      message: msg,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: func
      }, {
        text: 'Continue',
        handler: func1
      }]
    });

    await alert.present();
  }

}