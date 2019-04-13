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

  getPizzaExtras(){
    return this.afs.collection('pextras').snapshotChanges();
  }
  
}
