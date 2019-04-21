import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { TabsPageModule } from 'src/app/tabs/tabs.module';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.page.html',
  styleUrls: ['./fooditems.page.scss'],
})
export class FooditemsPage implements OnInit {

  type;
  food;
  image;
  catId;
  category;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
     this.route.params.subscribe(res =>{
      this.type = res.type;
      if(this.type === 'pizza'){
        this.getPizzaItems();
        this.image = 'assets/imgs/pepperpizza.png';
      }
      else if(this.type === 'pasta'){
        this.getPastaItems();
        this.image = 'assets/imgs/pasta.png';
      }
      else if(this.type === 'salad'){
        this.getSaladItems();
        this.image = 'assets/imgs/Salad.png'
      }
      else if(this.type === 'appetizers'){
        this.getAppetizerItems();
        this.image = 'assets/imgs/appetizers.png'
      }
      else if(this.type === 'desserts'){
        this.getDessertItems();
        this.image = 'assets/imgs/desserts.png'
      }
      else if(this.type === 'beverages'){
        this.getBeverageItems();
        this.image = 'assets/imgs/beverages.png'
      }
      else if(this.type && res.catId){
        this.catId = res.catId;
        this.category = JSON.parse(res.data);
        this.image = this.category.imageURL;
        this.getCategoryItems();
      }
    });
  }

  getCategoryItems(){
    this.api.getCategoryItems(this.catId)
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data}
    })))
    .subscribe(res =>{
      this.food = res;
    })
  }

  getBeverageItems(){
    this.api.getAllBeverages()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data}
    })))
    .subscribe(res =>{
      this.food = res;
    })
  }

  getDessertItems(){
    this.api.getAllDesserts()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data}
    })))
    .subscribe(res =>{
      this.food = res;
    })
  }

  getAppetizerItems(){
    this.api.getAllAppetizers()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data}
    })))
    .subscribe(res =>{
      this.food = res;
    })
  }

  getPizzaItems(){
    this.api.getAllPizzas()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data}
      })))
      .subscribe(res =>{
        this.food = res;
      })
  }

  getPastaItems(){
    this.api.getAllPasta()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data}
    })))
    .subscribe(res =>{
      this.food = res;
    })
  }

  getSaladItems(){
    this.api.getAllSalad()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data}
    })))
    .subscribe(res =>{
      this.food = res;
    })
  }

  fooddetails(item){
    this.router.navigate(['/tabs/fooddetails']);
    this.helper.setData(item);
    this.helper.setType(this.type);
    if(this.category){
      this.helper.setCategory(this.category);
      localStorage.setItem('category',JSON.stringify(this.category));
    }
    localStorage.setItem('data', JSON.stringify(item))
    localStorage.setItem('type', this.type);
  }
  goback(){
    this.router.navigate(['../']);
  }
}
