import { Injectable } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  Mymodal
  constructor( public modalController: ModalController) { }

  async presentModal(type) {
    this.Mymodal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { type: type },
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
}