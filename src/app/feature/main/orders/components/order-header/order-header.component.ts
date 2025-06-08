import { Component, computed, input } from '@angular/core';
import { OrderStatus } from '../../../../../core/interfaces/orders.type';

@Component({
  selector: 'app-order-header',
  imports: [],
  template: `
    <header class="w-full bg-secondary rounded-t-2xl  text-white py-2">
    <div class="p-2 px-4">
    <h1 class="text-xl sm:text-2xl font-bold">{{orderStatusMsg().msg1}}</h1>
    <h2 class="text-sm sm:text-lg">{{orderStatusMsg().msg2}}</h2>
    </div>
    </header>
  `,
})
export class OrderHeaderComponent {
  orderStatus = input.required<OrderStatus>();
  orderStatusMsg = computed<{msg1 : string , msg2? : string}>(() => {
    if(!this.orderStatus() || this.orderStatus() === 'Rejected') return {
      msg1 : '⚠️ Unfortunately, your order has been rejected.',
      msg2 : ' Please check your details or contact support for more information.',
    }
    else if(this.orderStatus() === 'Pending') return {
      msg1 : '🕒 Your order is pending.',
      msg2 : 'Thank you for your order!',
    }
    else if(this.orderStatus() === 'Accepted') return {
      msg1 : '✅ Your order has been accepted!',
      msg2 : 'We are processing your order.',
    }
    return {
      msg1: 'Order status unknown',
      msg2: 'Please contact support for assistance.'
    }
  })
}
