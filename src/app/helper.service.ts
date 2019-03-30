import { Injectable } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  Mymodal
  constructor( public modalController: ModalController) { }

  async presentModal() {
    this.Mymodal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { value: 123 }
    });
  
    return await this.Mymodal.present();
  }
  closeModal(){
    this.Mymodal.dismiss()
  }
}