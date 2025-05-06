import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css']
})
export class OrderPizzaComponent implements OnInit {
  data:any;
  constructor(private api:ApiService){}
  ngOnInit(){
    this.getPizza();
    console.log('hi');
  }
  getPizza(){
    this.api.getPizza().subscribe(res=>{
      this.data=res;
      console.log(res);
      
    })
  }
  addPizza(pizza:any){
    this.api.addIngredient(pizza).subscribe(res=>console.log('SUCCESS:',res)
    )
  }
}
