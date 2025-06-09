import { Component, computed, inject } from '@angular/core';
import { OrderStore } from '../../../../store/orders/orders.signal';
import { AppStore } from '../../../../store/app.store';
import { catchError, EMPTY, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderHeaderComponent } from "../components/order-header/order-header.component";
import { MenuItem } from 'primeng/api';
import { NavListItemComponent } from "../../../../shared/components/navigations/nav-list-item/nav-list-item.component";
import { OrderCardComponent } from "../components/order-card/order-card.component";
import { MsgEmptyComponent } from '../../../../shared/components/msg-empty/msg-empty.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    OrderHeaderComponent,
    NavListItemComponent,
    OrderCardComponent,
    MsgEmptyComponent
  ],
  template: `
  <section class="w-full" role="main" aria-label="Orders">
    <app-nav-list-item [items]="navLinks()" class="pb-5" aria-label="Navigation"/>
    
    <main class="space-y-20" aria-live="polite">
      @for (order of orderStore.orders(); track order.id; let index = $index) {
        @defer (on viewport) {
          <div class="w-full grid grid-cols-1 shadow shadow-gray-300 rounded-t-2xl" 
               role="article"
               [attr.aria-label]="'Order ' + (index + 1)">
            <app-order-header [orderStatus]="order.status"/>
            <app-order-card [order]="order"/>
          </div>
        }@placeholder {
          <div class="w-full h-150 rounded-t-2xl bg-gray-300 animate-pulse" 
              role="status"
             aria-label="Loading order content"></div>
        }
      }

      @if(orderStore.isLoading()){
        <div class="w-full h-80 flex justify-center items-center" 
             role="status"
             aria-label="Loading orders">
          <p-progress-spinner 
            strokeWidth="8" 
            fill="transparent" 
            animationDuration=".5s" 
            [style]="{ width: '70px', height: '70px' }" 
            aria-label="Loading spinner"/>
        </div>
      }

      @if (orderStore.orders().length === 0 && !orderStore.isLoading()){
        <app-msg-empty msgEmpty="Your Order is Empty!" />
      }
    </main>
  </section>
  `,
  providers: [OrderStore],
})
export class OrdersComponent {
  readonly orderStore = inject(OrderStore);
  private readonly appStore = inject(AppStore);

  navLinks = computed<MenuItem[]>(() => [
    {label: 'Home', icon: 'pi pi-home', routerLink: '/main/home'},
    {label: `Order ${this.orderStore.orderCount()}`, icon: 'pi pi-shopping-bag'}
  ]);

  constructor() {
    this.getOrders();
  }

  private getOrders(): void {
    this.appStore.initGetUserData().pipe(
      tap(({id}) => this.orderStore.getUserOrders(id)),
      catchError(() => EMPTY),
      takeUntilDestroyed(),
    ).subscribe();
  }
}
