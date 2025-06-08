import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, signal } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { OrderRelations } from '../../../../../core/interfaces/orders.type';
import { ConfirmationService } from 'primeng/api';
import { OrderStore } from '../../../../../store/orders/orders.signal';

@Component({
  selector: 'app-order-card',
  imports: [SharedModule],
  template : `
  <nav class="w-full grid grid-cols-1 gap-4">

  <p-accordion [value]="['0','2']" [multiple]="true"  >
    <p-accordion-panel value="0" >
        <p-accordion-header>Order Details</p-accordion-header>
        <p-accordion-content>
    <header class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
      <div class="flex flex-col justify-center items-center">
      <h1 class="text-gray-500 font-semibold">
      <i  (click)="copyOrderNumber(order().id!)"
      title="Copy Code" class="pi pi-copy cursor-pointer duration-200 transition-colors"
      [ngClass]="orderNumber() === order().id ? 'text-secondary' : 'text-gray-900'">
      </i> 
      Order Number
      </h1>
      <h2 class="text-gray-800 text-sm lg:text-base">{{order().id}}</h2>
      </div>
      <div class="flex flex-col justify-center items-center">
      <h1 class="text-gray-500 font-semibold">Date</h1>
      <h2 class="text-gray-800 text-sm lg:text-base">{{order().created_at}}</h2>
      </div>
      <div class="flex flex-col justify-center items-center">
      <h1 class="text-gray-500 font-semibold">Total</h1>
      <h2 class="text-secondary font-bold text-sm lg:text-base">{{order().total_price | currency : 'EGP'}}</h2>
      </div>
  </header>
        </p-accordion-content>
    </p-accordion-panel>

    <p-accordion-panel value="1">
        <p-accordion-header>Shipping Information</p-accordion-header>
        <p-accordion-content>
        <ul class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        @for (item of ShippingInformation(); track item) {
        @if(item.value){ 
        <li >
        <h1 class="text-gray-500 font-semibold">{{item.title}}</h1>
        <h2 class="text-gray-800 text-sm lg:text-base">{{item.value}}</h2>
        </li>
        }
        }
        </ul>
        </p-accordion-content>
    </p-accordion-panel>

    <p-accordion-panel value="2">
        <p-accordion-header>Order Items ({{order().order_items.length}})</p-accordion-header>
        <p-accordion-content>
        <ul class="grid grid-cols-1 gap-2">
        @for (order of order().order_items; track order) {
        <li class="flex justify-between items-center hover:bg-gray-300 p-1 rounded duration-200 transition-colors">
        <div class="flex flex-wrap  gap-5">
        <div class="size-18 border border-gray-300 rounded p-1">
        @let productImage = order.product ? order.product.images[0]  : null ;
        @if(productImage){
        <img [src]="productImage.img_url" [alt]="productImage.img_name" loading="lazy"
        class="size-full object-contain">
        }
        </div>
        <div class=" space-y-1">
        <h1 class="sm:w-120 lg:w-150 line-clamp-1 text-gray-900 font-semibold capitalize">{{order.product?.title}}</h1>
        <h2 class="capitalize text-gray-500 text-sm">Color: {{order.product?.color}}</h2>
        <h3 class="capitalize text-gray-700 text-sm">Qty: {{order.quantity}}</h3>
        </div>
        </div>
        <h2 class="text-gray-800 font-bold text-sm lg:text-base">
        {{order.product?.final_price| currency : 'EGP'}}
        </h2>
        </li>
        }
        </ul>
        </p-accordion-content>
    </p-accordion-panel>
    <div class="flex  p-2  border-x-1 border-b-1  border-b-gray-400 border-x-gray-400">
    <p-confirmpopup />
    <p-button  (onClick)="confirm($event , order().id!)" label="Cancel Order"  variant="text" severity="danger"/>
    </div>
</p-accordion>

  </nav>
  `,
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  providers : [ConfirmationService]
})
export class OrderCardComponent {
  order = input.required<OrderRelations>();
  private readonly orderStore = inject(OrderStore)
  private readonly confirmationService = inject(ConfirmationService);

  ShippingInformation = computed(() => [
  {title : 'Customer' , value : this.order().user_data.name},
  {title : 'Eamil' , value : this.order().user_data.email},
  {title : 'Phone' , value : this.order().user_data.phone},
  {title : 'Shipping Method' , value : this.order().payment_methods},
  {title : 'City' , value : this.order().user_data.city},
  {title : 'Address' , value : this.order().user_data.streetAddress},
  {title : 'Apartment' , value : this.order().user_data.apartment},
  ]
)
  
  orderNumber = signal<string>('');

  copyOrderNumber(code : string) {
  navigator.clipboard.writeText(code);
  this.orderNumber.set(code);
  }

  
  confirm(event: Event , orderId : string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to Cancel this Order?',
        icon: 'pi pi-info-circle',
        rejectButtonProps: {
        label: 'NO',
        severity: 'secondary',
        outlined: true
        },
        acceptButtonProps: {
        label: 'Yes',
        severity: 'danger'
        },
        accept: () => {
        this.orderStore.cancelOrder(orderId)
        },
    });
}
} 