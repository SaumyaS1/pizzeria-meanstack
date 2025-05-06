import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}
  baseURL='http://localhost:3000'

  getPizza=()=>this.http.get(`${this.baseURL}/getpizza`)

  getCart=()=>this.http.get(`${this.baseURL}/get/cart`)

  getIngredient=()=>this.http.get(`${this.baseURL}/getingredients`)

  addIngredient=(body:object): Observable<any>=>this.http.post(`${this.baseURL}/cart/add`,body)
  addPizza=(body:object): Observable<any>=>this.http.post(`${this.baseURL}/cart/add`,body)

  deleteCart=(id:any)=>this.http.delete(`${this.baseURL}/cart/${id}`);

  updateCart  =(id:any)=>this.http.put(`${this.baseURL}/cart/${id}`,{});
}
