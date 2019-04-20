import { Injectable } from '@angular/core';
import { ModalComponent } from '../pages/modal/modal.component';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  Mymodal
  cart: BehaviorSubject<Array<any>>;
  loading;
  data: BehaviorSubject<any>;
  type: BehaviorSubject<string>

  constructor( public modalController: ModalController, public toastController: ToastController, public alertController: AlertController,
    public loadingController: LoadingController) {
    if(localStorage.getItem('cart'))
      this.cart = new BehaviorSubject<Array<any>>(JSON.parse(localStorage.getItem('cart')))
    else
      this.cart = new BehaviorSubject<Array<any>>([]);
    if(localStorage.getItem('data'))
      this.data = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('data')));
    else
      this.data = new BehaviorSubject<any>({});  
    if(localStorage.getItem('type'))
      this.type = new BehaviorSubject<string>(localStorage.getItem('type'));
    else 
      this.type = new BehaviorSubject<string>('');
  }

  getType(){
    return this.type.asObservable();
  }

  setType(value){
    this.type.next(value);
  }

  setData(value){
    this.data.next(value);
  }

  getData(){
    return this.data.asObservable();
  }

  setCart(value){
    this.cart.next(value);
  }

  getCart(){
    return this.cart.asObservable();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Wird geladen...'
    });
    await this.loading.present();

  }

  closeLoading(){
    this.loading.dismiss();
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