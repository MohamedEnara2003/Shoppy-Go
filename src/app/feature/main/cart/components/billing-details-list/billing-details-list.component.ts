import { Component, computed, inject } from '@angular/core';
import { AppStore } from '../../../../../store/app.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing-details-list',
  imports: [CommonModule],
  template: `
  <div role="region" aria-label="Billing Details Summary">
    <h2 class="sr-only">Billing Details</h2>
    <ul class="w-full grid grid-cols-1 gap-3" role="list">
      @for (item of cartTotal(); track item) {
        <li class="w-full flex justify-between items-center border-b border-gray-400 text-sm" role="listitem">
          <h3 class="font-medium">{{item.title}}</h3>
          <span [attr.aria-label]="item.title + ' amount'">{{item.value | currency : 'EGP'}}</span>
        </li>
      }
    </ul>
  </div>
  `,
})
export class BillingDetailsListComponent {
  private readonly appStore = inject(AppStore);
  
  cartTotal = computed<Array<{title: string, value: string | number}>>(() => [
    {title: 'Subtotal:', value: this.appStore.cartTotalPrice()},
    {title: 'Shipping:', value: this.appStore.cartTotalPrice()},
    {title: 'Total:', value: this.appStore.cartTotalPrice()},
  ]);
}
