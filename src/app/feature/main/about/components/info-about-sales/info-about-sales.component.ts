import { Component, signal } from '@angular/core';
import { ServiceCardComponent } from "../../../../../shared/components/service-card/service-card.component";
import { ServiceCard } from '../../../../../shared/interfaces/shared.types';

@Component({
  selector: 'app-info-about-sales',
  imports: [ServiceCardComponent],
  template: `
    <section class="w-full" aria-labelledby="sales-stats-heading">
      <h2 id="sales-stats-heading" class="sr-only">Sales Statistics</h2>
      <ul class="w-full flex flex-wrap justify-evenly items-center" role="list">
        @for (item of infoAboutSales(); track item) {
          <li role="listitem">
            <app-service-card [service]="item"/>
          </li>
        }
      </ul>
    </section>
  `,
})
export class InfoAboutSalesComponent {
  infoAboutSales = signal<ServiceCard[]>([
    {icon: 'pi pi-shop', title: '10.5k', info: 'Sellers active on our site'},
    {icon: 'pi pi-dollar', title: '33k', info: 'Monthly Product Sales'},
    {icon: 'pi pi-shopping-bag', title: '45.5k', info: 'Customers active on our site'},
    {icon: 'pi pi-money-bill', title: '25k', info: 'Annual gross sales on our site'},
  ]).asReadonly();
}
