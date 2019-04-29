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
    return this.afs.collection('pextras', ref => ref.orderBy('price','asc')).snapshotChanges();
  }

  getPastaExtras(){
    return this.afs.collection('pastaextras', ref => ref.orderBy('price','asc')).snapshotChanges();
  }

  getAllDeals(){
    return this.afs.collection('deals').snapshotChanges();
  }

  getAllZipCodes(){
    return this.afs.collection('zips', ref => ref.where('code','>',0).orderBy('code','asc')).snapshotChanges();
  }

  addToOrders(data){
    return this.afs.collection('orders').add(data);
  }

  getAllCategories(){
    return this.afs.collection('categories').snapshotChanges();
  }

  getCategoryItems(id){
    return this.afs.collection('items', ref => ref.where('id','==',id)).snapshotChanges();
  }

  getDiscountAmount(){
    return this.afs.doc('zips/discount').valueChanges();
  }

  getTimings(){
    return this.afs.collection('timing').snapshotChanges();
  }
  
}
