import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-service-details',
  imports: [],
  template: `
  <article class="relative w-full border border-primary/40 rounded p-4 grid grid-cols-1  gap-5
  after:absolute  after:w-full  after:h-0.5  after:bg-primary/40  after:left-0 after:-translate-y-1/2 after:top-1/2">

  @for (item of service(); track item) {
  <div class="flex items-center gap-5 text-primary">
  <span [class]="item.icon" [style]="{fontSize : '1.2rem'}"></span>
  <div class="capitalize flex flex-col justify-center">
  <h1 class="title-h1 text-sm">{{item.serviceType}}</h1>
  <h2 class="text-xs">{{item.serviceName}}</h2>
  </div>
  </div>
}
  </article>
  `,
  styles: ``
})
export class ServiceDetailsComponent {
  service = signal([
  {icon : 'pi pi-truck ' , serviceType : 'Free Delivery' , serviceName : 'Enter your postal code for Delivery Availability' },
  {icon : 'pi pi-sync' , serviceType : 'Returns Delivery' , serviceName : 'Free 30 Days Delivery Returns. Details' },
  ]).asReadonly()
}
