import { Component, computed, inject, model, signal } from '@angular/core';
import { OrderRelations, OrderStatus } from '../../../../../core/interfaces/orders.type';
import { OrderCardComponent } from "../../../../../feature/main/orders/components/order-card/order-card.component";
import { OrderStore } from '../../../../../store/orders/orders.signal';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-view',
  imports: [OrderCardComponent, SelectButtonModule, FormsModule],
  template: `
    <section 
      class="w-full h-screen fixed top-0 left-0 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="'Order Details - ' + (order()?.id || '')"
    >
      <div class="w-full max-w-6xl h-[90%] bg-white z-50 rounded py-2 grid grid-cols-1 gap-2">
        <button 
          (click)="order.set(null)" 
          class="pi pi-times p-2 px-4 hover:text-secondary duration-200 transition-colors cursor-pointer"
          aria-label="Close order details"
        >
        </button>

        <app-order-card 
          [order]="order()!" 
          class="size-full overflow-y-auto" 
          style="scrollbar-width: none;"
        />

        <div class="w-full flex justify-center items-center">
          <p-selectbutton 
            [options]="orderStatusList()" 
            [ngModel]="orderStatus()" 
            (onChange)="orderStore.updateOrderStatus(order()?.id!, $event.value)"
            optionLabel="name" 
            optionValue="value"
            aria-label="Update order status"
          />
        </div>
      </div>
      
      @if(order()){
        <button 
          (click)="order.set(null)" 
          class="size-full bg-primary/40 z-30 fixed top-0 left-0"
          aria-label="Close modal overlay"
        ></button>
      }
    </section>
  `,
})
export class OrderViewComponent {
  readonly orderStore = inject(OrderStore);
  order = model<OrderRelations | null>();
  
  orderStatusList = signal<Array<{name: OrderStatus, value: OrderStatus}>>([
    { name: 'Accepted', value: 'Accepted'},
    { name: 'Pending', value: 'Pending'},
    { name: 'Rejected', value: 'Rejected'},
  ]);

  orderStatus = computed<OrderStatus>(() => this.order()?.status || 'Pending');
}
