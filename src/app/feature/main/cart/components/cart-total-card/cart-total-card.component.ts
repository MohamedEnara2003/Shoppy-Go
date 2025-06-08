import { Component, inject } from '@angular/core';
import { BillingDetailsListComponent } from "../billing-details-list/billing-details-list.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-total-card',
  imports: [BillingDetailsListComponent, RouterModule],
  template: `
  <div class="w-70 h-50 border-primary/30 border rounded p-2 flex flex-col gap-4 text-primary" 
       role="region" 
       aria-label="Cart Total Summary">
    <h2 class="w-full text-left font-semibold">Cart Total</h2>
    <app-billing-details-list/>
    <button 
      (click)="navigateToCheckout()"
      type="button" 
      class="w-full btn-secondary text-sm"
      aria-label="Proceed to checkout"
      (keydown.enter)="navigateToCheckout()"
      (keydown.space)="navigateToCheckout()">
      Proceed to checkout
    </button>
  </div>
  `,
})
export class CartTotalCardComponent {
  private readonly router = inject(Router);
  navigateToCheckout() {
    this.router.navigateByUrl('/main/checkout');
  }
}
