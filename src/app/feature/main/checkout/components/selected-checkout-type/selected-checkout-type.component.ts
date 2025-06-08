import { Component, inject, model, signal } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { Router } from '@angular/router';
import { CheckoutType } from '../../interface/checkout.type';



@Component({
  selector: 'app-selected-checkout-type',
  imports: [SharedModule],
  template: `
<form class="flex flex-col gap-4" >
  @for (checkout of checkoutType(); track checkout.value) {
  <div  class="field-checkbox">
    <p-radiobutton [inputId]="checkout.value" [name]="checkout.value" [binary]="true" [value]="checkout.value" 
    [ngModel]="checkoutTypeValue() === checkout.value"  (ngModelChange)="selecteCheckoutType($event)" 
    />
    <label [for]="checkout.value" class="ml-2">{{ checkout.title}}</label>
  </div>
  }
</form>
  `,
})
export class SelectedCheckoutTypeComponent {
  private readonly router = inject(Router);
  checkoutType = signal<Array<{title : string , value : CheckoutType}>>([
  {title : 'Bank' , value : 'BANK' },
  {title : 'Cash on delivery' , value : 'CASH' },
  ]);
  
  checkoutTypeValue = model<CheckoutType>('CASH');

  selecteCheckoutType(value : CheckoutType) : void {
  this.checkoutTypeValue.set(value);
  this.router.navigate(['/main/checkout'], {queryParams : {checkoutType : value}});
  }
}
