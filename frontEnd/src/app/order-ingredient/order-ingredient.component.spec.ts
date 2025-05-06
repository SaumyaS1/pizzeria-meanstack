import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderIngredientComponent } from './order-ingredient.component';

describe('OrderIngredientComponent', () => {
  let component: OrderIngredientComponent;
  let fixture: ComponentFixture<OrderIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderIngredientComponent]
    });
    fixture = TestBed.createComponent(OrderIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
