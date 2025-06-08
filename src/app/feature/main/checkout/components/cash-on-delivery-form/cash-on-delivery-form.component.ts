import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { OrderStore } from '../../../../../store/orders/orders.signal';
import { Order, userOrderData } from '../../../../../core/interfaces/orders.type';
import { AppStore } from '../../../../../store/app.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cash-on-delivery-form',
  imports: [SharedModule],
  template: `
    <form [formGroup]="deliveryForm" (ngSubmit)="onSubmit()" class="w-full space-y-7">

      <div class="flex flex-col space-y-2">
        <p-floatlabel variant="on">
          <label for="name" class="text-sm font-medium text-primary">Your Name*</label>
          <input 
            pInputText 
            id="name" 
            formControlName="name"
            class="w-full p-2 "
            [ngClass]="{'border-red-500': deliveryForm.get('name')?.invalid && deliveryForm.get('name')?.touched}"
          />
        </p-floatlabel>
        <small class="text-red-500" *ngIf="deliveryForm.get('name')?.invalid && deliveryForm.get('name')?.touched">
          Name is required
        </small>
      </div>

      <div class="flex flex-col space-y-2">
        <p-floatlabel variant="on">
          <label for="email" class="text-sm font-medium text-primary">Email Address*</label>
          <input 
            pInputText 
            id="email" 
            formControlName="email"
            class="w-full p-2 "
            [ngClass]="{'border-red-500': deliveryForm.get('email')?.invalid && deliveryForm.get('email')?.touched}"
          />
        </p-floatlabel>
        <small class="text-red-500" *ngIf="deliveryForm.get('email')?.invalid && deliveryForm.get('email')?.touched">
          Please enter a valid email address
        </small>
      </div>

      <div class="flex flex-col space-y-2">
        <p-floatlabel variant="on">
          <p-inputmask 
            id="phone" 
            formControlName="phone" 
            mask="09999999999" 
            class="w-full"
            [ngClass]="{'border-red-500': deliveryForm.get('phone')?.invalid && deliveryForm.get('phone')?.touched}"
          />
          <label for="phone" class="text-sm font-medium text-primary">Phone Number*</label>
        </p-floatlabel>
        <small class="text-red-500" *ngIf="deliveryForm.get('phone')?.invalid && deliveryForm.get('phone')?.touched">
          Please enter a valid Egyptian phone number (e.g., 01XXXXXXXXX)
        </small>
      </div>

      <div class="flex flex-col space-y-2">
        <p-floatlabel variant="on">
          <label for="streetAddress" class="text-sm font-medium text-primary">Street Address*</label>
          <input 
            pInputText 
            id="streetAddress" 
            formControlName="streetAddress"
            class="w-full p-2 "
            [ngClass]="{'border-red-500': deliveryForm.get('streetAddress')?.invalid && deliveryForm.get('streetAddress')?.touched}"
          />
        </p-floatlabel>
        <small class="text-red-500" *ngIf="deliveryForm.get('streetAddress')?.invalid && deliveryForm.get('streetAddress')?.touched">
          Street address is required
        </small>
      </div>

      <div class="flex flex-col space-y-2">
        <p-floatlabel variant="on">
          <label for="city" class="text-sm font-medium text-primary">Town/City*</label>
          <input 
            pInputText 
            id="city" 
            formControlName="city"
            class="w-full p-2 "
            [ngClass]="{'border-red-500': deliveryForm.get('city')?.invalid && deliveryForm.get('city')?.touched}"
          />
        </p-floatlabel>
        <small class="text-red-500" *ngIf="deliveryForm.get('city')?.invalid && deliveryForm.get('city')?.touched">
          City is required
        </small>
      </div>

      <div class="flex flex-col space-y-2">
        <p-floatlabel variant="on">
          <label for="apartment" class="text-sm font-medium text-primary">Apartment, floor, etc. (optional)</label>
          <input 
            pInputText 
            id="apartment" 
            formControlName="apartment"
            class="w-full p-2 "
          />
        </p-floatlabel>
      </div>

      <div class="mt-6">

      <button type="submit"  [disabled]="deliveryForm.invalid" class="btn-secondary"
      [ngClass]="deliveryForm.invalid ? 'cursor-auto opacity-70' : ' cursor-pointer'">
        Place Order
      </button>
      </div>
    </form>
  `,
  providers : [OrderStore]
})
export class CashOnDeliveryFormComponent implements OnInit {
  private readonly orderStore = inject(OrderStore);
  private readonly appStore = inject(AppStore);
  private readonly router = inject(Router);
  deliveryForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
        this.deliveryForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/) // Validates Egyptian mobile numbers
      ]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      apartment: ['']
    });
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
    const values : userOrderData = this.deliveryForm.getRawValue();
    const user_id = this.appStore.currentUser()?.id ;
  
    if(!user_id) return ;

    const order : Order = {
    user_id,
    user_data : values ,
    total_price : this.appStore.cartTotalPrice() ,
    status : 'Pending',
    payment_methods : 'Cash on delivery'
    }

    this.orderStore.addOrder(order)
    this.router.navigate(['/main/orders']);
    }
  }
}






