import { Injectable } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  Mymodal
  constructor( public modalController: ModalController, public toastController: ToastController) { }

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

}