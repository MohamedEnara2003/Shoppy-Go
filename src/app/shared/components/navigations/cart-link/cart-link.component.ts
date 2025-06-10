import { Component, inject } from '@angular/core';
import { AppStore } from '../../../../store/app.store';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-cart-link',
  imports: [SharedModule],
  template: `
            <a routerLink="/main/cart"  routerLinkActive="text-secondary"
            class="text-gray-900 hover:text-secondary duration-300 flex flex-col items-center">
            <span >
            <i class="pi pi-shopping-cart" 
                pBadge 
                severity="danger"  
                [value]="appStore.cartsCount()" 
                badgeSize="small" 
                style="font-size: 1.4rem"
                aria-hidden="true">
              </i>
            </span>
            <ng-content />
          </a>
  `,

})
export class CartLinkComponent {
  readonly appStore = inject(AppStore);
}
