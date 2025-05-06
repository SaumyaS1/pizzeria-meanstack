import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { OrderIngredientComponent } from './order-ingredient/order-ingredient.component';
import { CartComponent } from './cart/cart.component';
const routes: Routes = 
[{ path: '', component: HomeComponent },
{ path: 'orderPizza', component: OrderPizzaComponent },
{ path: 'orderIngredient', component: OrderIngredientComponent },
{ path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
