import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  @Input() type;

  constructor(private modal: ModalController, private router: Router) { }

  ngOnInit() {
    setTimeout( () =>{
      this.modal.dismiss();
    }, 5000) ;
  }

  goto(){
    this.modal.dismiss();
    this.router.navigate(['/info']);
  }

}
