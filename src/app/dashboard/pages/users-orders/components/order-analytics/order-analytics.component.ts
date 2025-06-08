import { Component, computed, inject } from '@angular/core';
import { OrderStore } from '../../../../../store/orders/orders.signal';
import { AnalyticsCardComponent } from "../../../../components/analytics-card/analytics-card.component";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { analyticsType } from '../../../../interfaces/analytics.type';

@Component({
  selector: 'app-order-analytics',
  imports: [AnalyticsCardComponent , CommonModule],
  template: `
    <section 
      class="w-full grid grid-cols-2 lg:grid-cols-3 gap-5 p-4"
      aria-label="Order Analytics Overview"
    >
      <h2 class="sr-only">Order Analytics Overview</h2>
      @for (list of orderAnalyticsList(); track list) {
        <app-analytics-card
          [title]="list.title"
          [count]="list.count"
          [icon]="list.icon!"
        />
      }
    </section>
  `,
  providers : [CurrencyPipe]
})
export class OrderAnalyticsComponent {
  private readonly orderStore = inject(OrderStore);
  private readonly currencyPipe = inject(CurrencyPipe);

  orderAnalyticsList = computed<analyticsType[]>(() => {
    const order = this.orderStore;
    return [
      {title : 'Total Orders' , count : order.orderCount() , icon : 'pi-shopping-bag'},
      {title : 'Total Orders Items' , count : order.orderItemsCount() , icon : 'pi-box'},
      {title : 'Orders Items Total price' ,
        count : this.currencyPipe.transform(order.orderItemsTotalPrice(), 'EGP') || '0 EGP' , icon : 'pi-box'
      },
      {title : 'Orders Accepted' , count : (order.orderStatusCount('Accepted')) , icon : 'pi-check-square'},
      {title : 'Orders Pending' , count : (order.orderStatusCount('Pending')) , icon : 'pi-clock'},
      {title : 'Orders Rejected' , count : (order.orderStatusCount('Rejected')) , icon : 'pi-exclamation-triangle'},
    ]
  });
}
