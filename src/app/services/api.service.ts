import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) { }

  getAllPizzas(){
    return this.afs.collection('pizza').snapshotChanges();
  }

  getAllPasta(){
    return this.afs.collection('pasta').snapshotChanges();
  }

  getAllSalad(){
    return this.afs.collection('salads').snapshotChanges();
  }

  getAllAppetizers(){
    return this.afs.collection('vorspeisen').snapshotChanges();
  }

  getAllDesserts(){
    return this.afs.collection('dessert').snapshotChanges();
  }

  getAllBeverages(){
    return this.afs.collection('beverages').snapshotChanges();
  }

  getPizzaExtras(){
    return this.afs.collection('pextras').snapshotChanges();
  }

  getPastaExtras(){
    return this.afs.collection('pastaextras').snapshotChanges();
  }
  
}
