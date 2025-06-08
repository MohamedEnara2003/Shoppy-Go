import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { AppStore } from '../../../store/app.store';

@Component({
  selector: 'app-dashboard-nav-side',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MenubarModule,
    ButtonModule,
    RippleModule
  ],
  template: `
    <aside 
      aria-label="Dashboard Navigation" 
      class="size-full bg-primary transition-all duration-300 flex flex-col justify-between"
    >
      <div class="flex flex-col gap-5">
        <div class="p-4 border-b border-b-gray-200 flex items-center justify-between">
          <h1 *ngIf="!appStore.isCollapsed()" class="text-xl font-bold text-white">Dashboard</h1>
          <button 
            (click)="appStore.toggleCollapse()"
            class="p-2 rounded-lg hover:bg-gray-100 hover:text-primary text-gray-100 
            transition-colors duration-200"
            pRipple
            [attr.aria-label]="appStore.isCollapsed() ? 'Expand navigation' : 'Collapse navigation'"
            [attr.aria-expanded]="!appStore.isCollapsed()"
          >
            <i [class]="appStore.isCollapsed() ? 'pi pi-angle-right' : 'pi pi-angle-left'" aria-hidden="true"></i>
          </button>
        </div>

        <nav class="p-4" aria-label="Main navigation">
          <ul class="space-y-2">
            @for (item of menuItems(); track item.label) {
              <li>
                <a 
                  [routerLink]="item.routerLink"
                  routerLinkActive="bg-secondary" 
                  [routerLinkActiveOptions]="{exact: true}"
                  [class.justify-center]="appStore.isCollapsed()"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary  
                  transition-colors duration-200 text-white"
                  pRipple
                  [attr.aria-current]="item.routerLink === '/dashboard' ? 'page' : undefined"
                >
                  <i [class]="item.icon + ' text-lg'" aria-hidden="true"></i>
                  <span *ngIf="!appStore.isCollapsed()">{{ item.label }}</span>
                </a>
              </li>
            }
          </ul>
        </nav>
      </div>

      <div class="p-2 border-t border-t-gray-400">
        <div class="flex items-center gap-3" [class.justify-center]="appStore.isCollapsed()">
          <div class="size-8 rounded-full bg-gray-300 flex items-center justify-center" aria-hidden="true">
            <i class="pi pi-user text-primary"></i>
          </div>
          <div *ngIf="!appStore.isCollapsed()">
            <p class="font-medium text-gray-200 capitalize">{{appStore.currentUser()?.full_name}}</p>
            <p class="text-sm text-secondary">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class DashboardNavSideComponent {
  readonly appStore = inject(AppStore);

  menuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      routerLink: '/dashboard/products'
    },
    {
      label: 'Orders',
      icon: 'pi pi-shopping-cart',
      routerLink: '/dashboard/orders'
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: '/dashboard/users'
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      routerLink: '/dashboard/analytics'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/dashboard/settings'
    }
  ]);
}
