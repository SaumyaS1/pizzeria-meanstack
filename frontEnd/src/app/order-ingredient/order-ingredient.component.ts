import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order-ingredient',
  templateUrl: './order-ingredient.component.html',
  styleUrls: ['./order-ingredient.component.css']
})
export class OrderIngredientComponent implements OnInit {
  ngOnInit(){
    this.getIngredients()
  }
  onTrigger(ing:object){
    const selectedIngredients = ing;
    this.api.addIngredient(selectedIngredients).subscribe((res:object)=>console.log(res))
  }
 constructor(private api:ApiService){}
 data:any;
 getIngredients(){
  this.api.getIngredient().subscribe(res=>{
    this.data=res;
    console.log(this.data);
  })
 }
}
