import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardNavSideComponent } from "../components/dashboard-nav-side/dashboard-nav-side.component";
import { AppStore } from '../../store/app.store';
import { SharedModule } from '../../shared/modules/shared.module';
import { DashboardHeaderComponent } from "../components/dashboard-header/dashboard-header.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, DashboardNavSideComponent, SharedModule, DashboardHeaderComponent],
  template: `
    <section class="w-full min-h-screen bg-gray-50">
    <div class="w-full  flex ">
    <app-dashboard-nav-side class=" h-screen"
    [ngClass]="appStore.isCollapsed() ?
    'w-15' : 'w-60'"/>
    
      <div class="w-full h-screen transition-all duration-300 px-4 ">
      <app-dashboard-header/>
      <main class="w-full h-[90vh] overflow-y-auto">
      <router-outlet/>
      </main>
      </div>
  </div>
    
    </section>
  `,
})
export class DashboardComponent {
  readonly appStore = inject(AppStore);
}
