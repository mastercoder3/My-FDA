import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(private helper: ModalController, private router: Router) { }

  ngOnInit() {}

  async closeModal(){
    const modal = await this.helper.getTop();
    modal.dismiss();
  }
}
