import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.page.html',
  styleUrls: ['./fooditems.page.scss'],
})
export class FooditemsPage implements OnInit {

  type;
  food;
  image;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

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
    });
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

  fooddetails(item){
    this.router.navigate(['/fooddetails',{
      data: JSON.stringify(item),
      type: this.type
    }]);
  }
  goback(){
    this.router.navigate(['../']);
  }
}
