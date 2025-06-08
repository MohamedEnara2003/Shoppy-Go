import { Component, signal } from '@angular/core';
import { ServiceCard } from '../../../../../shared/interfaces/shared.types';
import { ServiceCardComponent } from "../../../../../shared/components/service-card/service-card.component";

@Component({
  selector: 'app-service-highlights',
  imports: [ServiceCardComponent],
  template: `
  <article class="w-full flex-wrap flex justify-center md:justify-evenly items-center gap-10">
  @for (service of services(); track service) {
  <app-service-card [service]="service" />
  }
  </article>
  `,
})
export class ServiceHighlightsComponent {
  services = signal<ServiceCard[]>([
  {icon : 'pi pi-truck', 
  title : 'FREE AND FAST DELIVERY' , 
  info : 'Free delivery for all orders over $140'
  },
  {icon : 'pi pi-headphones', 
  title : '24/7 CUSTOMER SERVICE' , 
  info : 'Friendly 24/7 customer support'
  },
  {icon : 'pi pi-check-square', 
  title : 'MONEY BACK GUARANTEE' , 
  info : 'We reurn money within 30 days'
  },
  ])
}
