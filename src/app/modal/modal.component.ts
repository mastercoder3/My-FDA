import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(private helper: ModalController, private router: Router, private api: ApiService) { }

  @Input() type;
  @Input() addon;
  extras;
  added: Array<any> = [];

  ngOnInit() {
    if(this.addon)
      this.added = this.addon;
    this.getData();
  }

  getData(){
    if(this.type === 'pizza'){
      this.api.getPizzaExtras()
        .pipe(map(actions => actions.map(a =>{
          const data = a.payload.doc.data();
          const did = a.payload.doc.id;
          return {did, ...data};
        })))
        .subscribe(res =>{
          this.extras = res;
        })
    }
  }

  async closeModal(){
    const modal = await this.helper.getTop();
    modal.dismiss({
      addon: this.added
    });
  }

  getQuantity(did,text){
    if(this.added.length === 0 )
      return 0;

    let x: Array<any>;
    x = this.added.filter(data => data.did === did);
    if(x.length > 0){
      let quantity: Array<any>;
      quantity = x[0].items.filter(data => data.text === text);
      if(quantity.length > 0)
        return quantity[0].quantity;
      else
        return 0;
    }
    else{
      return 0;
    }
  }

  addToAdded(did,text,price){
    let x:number;
    x = this.added.findIndex(data => data.did === did);
    if(x > -1){
      let check = this.added[x].items;
      let checkindex = check.findIndex(data => data.text === text);
      if(checkindex > -1){
        this.added[x].items[checkindex].quantity++;
      }
      else{
        let item ={
          text: text,
          quantity: 1
        }
        this.added[x].items.push(item);
      }
    }
    else{
      this.added.push({
        did: did,
        price: price,
        items: [{
          text: text,
          quantity: 1
        }]
      })
    }
  }

  removeFromAdded(did,text){
    let x: number;
    x = this.added.findIndex(data => data.did === did);
    if(x > -1){
      let check = this.added[x].items;
      let find = check.findIndex(data => data.text === text);
      if(find > -1){
        if(this.added[x].items[find].quantity - 1 === 0){
          this.added[x].items.splice(find,1)
        }
        else{
          this.added[x].items[find].quantity--;
        }

        if(this.added[x].items.length === 0){
          this.added.splice(x,1)
        }
      }
    }
  }

  
}
