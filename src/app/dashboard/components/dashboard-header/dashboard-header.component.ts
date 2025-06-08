import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { UserProfileMenuComponent } from "../../../shared/components/user-profile-menu/user-profile-menu.component";

@Component({
  selector: 'app-dashboard-header',
  imports: [SharedModule, UserProfileMenuComponent],
  template: `
    <header class="w-full h-[10vh] px-4 flex justify-between items-center" role="banner">
      <div role="search">
        <p-floatlabel variant="on">
          <p-iconfield>
            <p-inputicon class="pi pi-search" aria-hidden="true" />
            <input 
              pInputText 
              id="search_input" 
              autocomplete="off" 
              pSize="small"
              aria-label="Search dashboard"
            />
          </p-iconfield>
          <label for="search_input">Search</label>
        </p-floatlabel>
      </div>

      <nav class="flex justify-center items-center gap-5" aria-label="Dashboard navigation">
        <a 
          routerLink="/main/home"
          aria-label="Go to home page"
        >
          <i class="pi pi-home hover:text-secondary duration-200 transition-colors" aria-hidden="true"></i>
        </a>
        <app-user-profile-menu />
      </nav>
    </header>
  `,
})
export class DashboardHeaderComponent {

}
