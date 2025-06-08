import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-nav-list-item',
  imports: [BreadcrumbModule],
  template: `
  <p-breadcrumb class="max-w-full" [model]="items()" [home]="home()" />
  `,
  styles: ``
})
export class NavListItemComponent {
  items = input.required<MenuItem[]>();
  home = input<MenuItem>();
}
