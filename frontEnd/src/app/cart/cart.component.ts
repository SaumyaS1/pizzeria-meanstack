import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
}) 
export class CartComponent implements OnInit {

  cartItems: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.api.getCart().subscribe(
      (data) => {
        this.cartItems = data;
        console.log('Cart:', this.cartItems);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  incrementQuantity(pizza: any) {
    this.api.addIngredient(pizza).subscribe(res => {
      console.log('SUCCESS:', res);
      // Once successfully added, fetch updated cart items
      this.fetchCartItems();
    });
  }

  decrementQuantity(id: any) {
    this.api.updateCart(id).subscribe(() => {
      // Once successfully updated, fetch updated cart items
      this.fetchCartItems();
    });
  }

  deleteItem(id: any) {
    this.api.deleteCart(id).subscribe(() => {
      // Once successfully deleted, fetch updated cart items
      this.fetchCartItems();
    });
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((acc: number, item: any) => acc + (item.price * item.qty), 0);
  }

  placeOrder() {
    console.log('Placing order:', this.cartItems);
    window.alert('Order Placed Successfully! ')
  }

}
