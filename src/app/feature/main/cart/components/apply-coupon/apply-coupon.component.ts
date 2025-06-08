import { Component } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-apply-coupon',
  imports: [FloatLabel, InputTextModule],
  template: `
  <div class="grid grid-cols-3 gap-4" role="group" aria-labelledby="coupon-label">
    <div class="col-span-2">
      <p-floatlabel variant="on">
        <input 
          id="coupon" 
          pInputText 
          class="w-full" 
          size="small" 
          autocomplete="off"
          aria-label="Enter coupon code"
          aria-describedby="coupon-description"
        />
        <label id="coupon-label" for="coupon">Coupon Code</label>
      </p-floatlabel>
      <span id="coupon-description" class="sr-only">Enter your coupon code to apply a discount</span>
    </div>
    <button 
      type="button" 
      class="btn-secondary text-sm p-1"
      aria-label="Apply coupon code"
    >
      Apply Coupon
    </button>
  </div>
  `,

})
export class ApplyCouponComponent {
}
