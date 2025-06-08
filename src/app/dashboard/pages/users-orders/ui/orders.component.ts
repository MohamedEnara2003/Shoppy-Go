import { Component, inject, signal } from '@angular/core';
import { OrderStore } from '../../../../store/orders/orders.signal';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { OrderRelations, OrderStatus } from '../../../../core/interfaces/orders.type';
import { OrderViewComponent } from "../components/order-view/order-view.component";
import { DayJsService } from '../../../../core/services/day-js.service';
import { OrderAnalyticsComponent } from "../components/order-analytics/order-analytics.component";

@Component({
  selector: 'app-orders',
  imports: [SharedModule, OrderViewComponent, OrderAnalyticsComponent],
  template: `
    <main class="w-full">
      <h1 class="sr-only">Orders Management</h1>
      <app-order-analytics />

      <section aria-label="Orders Table">
        <p-table 
          [value]="orderStore.orders()" 
          [paginator]="true"
          [rows]="5"
          [tableStyle]="{ 'min-width': '50rem' }"
          [rowsPerPageOptions]="[5, 10, 20]"
          aria-label="Orders List"
        >
          <ng-template #header>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Items</th>
              <th scope="col">Date</th>
              <th scope="col">Customer</th>
              <th scope="col">Payment Methods</th>
              <th scope="col">Order Status</th>
              <th scope="col">View</th>
            </tr>
          </ng-template>
          <ng-template #body let-order>
            <tr class="capitalize text-primary text-sm">
              <td>{{order.id}}</td>
              <td>{{order.order_items.length}}</td>
              <td>{{dayJs.formatTime(order.created_at)}}</td>
              <td>{{order.user_data.name}}</td>
              <td class="text-tertiary font-semibold">{{order.payment_methods}}</td>
              <td>
                <p-tag 
                  [value]="order.status" 
                  [severity]="initStatus(order.status)" 
                  [rounded]="true"
                  [attr.aria-label]="'Order status: ' + order.status"
                />
              </td>
              <td>
                <button 
                  type="button" 
                  (click)="viewOrderDetails.set(order)"
                  aria-label="View order details"
                >
                  <i class="pi pi-eye hover:text-secondary duration-200 transition-colors cursor-pointer"></i>
                </button>
              </td> 
            </tr>
          </ng-template>
        </p-table>
      </section>

      @if(viewOrderDetails()){
        <app-order-view 
          [order]="viewOrderDetails()!" 
          (orderChange)="viewOrderDetails.set($event!)" 
        />
      }
    </main>
  `,
  providers: [OrderStore]
})
export class OrdersComponent {
  readonly orderStore = inject(OrderStore);
  readonly dayJs = inject(DayJsService);
  
  constructor() {
    this.orderStore.getAllUsersOrders();
  }

  initStatus(status: OrderStatus): string {
    if(status === 'Accepted') return 'success';
    if(status === 'Pending') return 'info';
    if(status === 'Rejected') return 'danger';
    return 'Secondary';
  }
  
  viewOrderDetails = signal<OrderRelations | null>(null);
}
