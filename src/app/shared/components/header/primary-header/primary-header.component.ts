import { Component, inject } from '@angular/core';
import { MainLinksComponent } from "../../navigations/main-links/main-links.component";
import { SearchComponent } from "../../search/search.component";
import { AppStore } from '../../../../store/app.store';
import { UserProfileMenuComponent } from "../../user-profile-menu/user-profile-menu.component";
import { SharedModule } from '../../../modules/shared.module';
import { LogoComponent } from "../../logo/logo.component";
import { CartLinkComponent } from "../../navigations/cart-link/cart-link.component";

@Component({
  selector: 'app-primary-header',
  imports: [SharedModule, MainLinksComponent, SearchComponent, UserProfileMenuComponent, LogoComponent, CartLinkComponent],
  template: `
    <header class="w-full flex justify-between py-2 gap-5" role="banner">
      <app-logo class="flex-1" aria-label="Home"/>
      <nav class="hidden lg:inline-block flex-1" aria-label="Main navigation">
        <app-main-links/>
      </nav>
    
      <div class="flex justify-center items-center gap-5">
        <app-search/>
        <ul class="justify-center items-center gap-5 hidden lg:inline-flex flex-1" role="list">
          <li>
            <a routerLink="/main/wishlist" routerLinkActive="text-secondary"
              class="flex items-center"
              aria-label="View wishlist">
              <i class="pi pi-heart" style="font-size: 1.4rem" aria-hidden="true"></i>
            </a>
          </li>

          <li><app-cart-link /></li>
        </ul>

        <app-user-profile-menu />
      </div>
    </header>
  `,
})
export class PrimaryHeaderComponent {
  readonly appStore = inject(AppStore);
}
