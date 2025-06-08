import { Component, inject, signal } from '@angular/core';
import { AppStore } from '../../../store/app.store';
import { LinkType } from '../../interfaces/links.type';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-menu',
  imports: [RouterModule, CommonModule],
  template: `
    <div class="flex flex-col" role="navigation" aria-label="User Profile Menu">
      @let userImage = appStore.currentUser()?.avatar_url;
      <button 
        (click)="handleIsLoadMenu()" 
        aria-label="Toggle User Profile Menu" 
        role="button" 
        type="button"
        [attr.aria-expanded]="isLoadMenu()"
        class="size-7 rounded-full cursor-pointer hover:opacity-80 bg-secondary duration-200 transition-opacity"
      >
        @if(userImage && !isUserImageError()){
          <img 
            [src]="userImage" 
            [alt]="appStore.currentUser()?.email || 'User avatar'"  
            (error)="isUserImageError.set(true)"
            class="size-full object-cover rounded-full"
          >
        }@else {
          <i class="pi pi-user text-white" aria-hidden="true"></i>
        }
      </button>

      @if(isLoadMenu()){ 
        <nav class="relative" role="menu" aria-label="User Profile Options">
          <ul class="absolute right-0 top-2 w-50 rounded-box shadow-lg z-50 flex flex-col justify-start gap-2 p-2 
            backdrop-blur bg-gradient-to-t from-black/40 to-black/30 text-white/90 border border-white/10 capitalize"
            role="menu"
          >
            @if(!appStore.currentUser()){
              <li role="none">
                <a 
                  (click)="handleIsLoadMenu()" 
                  routerLink="/main/auth/sign-up"  
                  routerLinkActive="bg-black/25"
                  class="cursor-pointer hover:bg-black/25 duration-200 rounded-box p-0.5 block px-1"
                  role="menuitem"
                >
                  <i class="pi pi-user" aria-hidden="true"></i>
                  Sign Up
                </a>
              </li>

              <li role="none">
                <a 
                  (click)="handleIsLoadMenu()" 
                  routerLink="/main/auth/sign-in" 
                  routerLinkActive="bg-black/25"
                  class="cursor-pointer hover:bg-black/25 duration-200 rounded-box p-0.5 block px-1"
                  role="menuitem"
                >
                  <i class="pi pi-sign-in" aria-hidden="true"></i>
                  Log In
                </a>
              </li>
            }@else {
              @for (item of profileMenu(); track item) {
                <li role="none">
                  <a 
                    [routerLink]="item.path" 
                    routerLinkActive="bg-secondary/90 rounded-sm" 
                    (click)="item.linkName === 'Log out' ? appStore.signOut() : null; handleIsLoadMenu()"
                    class="cursor-pointer hover:bg-black/25 duration-200 rounded-box p-0.5 block px-1"
                    role="menuitem"
                  >
                    <i [class]="item.linkIcon" aria-hidden="true"></i>
                    {{item.linkName}}
                  </a>
                </li>
              }
            }
          </ul>
        </nav>
      }
    </div>
  `,
})
export class UserProfileMenuComponent {
  readonly appStore = inject(AppStore);
  isLoadMenu = signal<boolean>(false);
  profileMenu = signal<LinkType[]>([
    {
      linkName: 'Manage My Account',
      linkIcon: 'pi pi-user',
      path: '/main/account'
    },
    {
      linkName: 'My Order',
      linkIcon: 'pi pi-shopping-bag',
      path: '/main/orders'
    },
    {
      linkName: 'My Cancellations',
      linkIcon: 'pi pi-times-circle',
    },
    {
      linkName: 'My Reviews',
      linkIcon: 'pi pi-star',
      path: '/main/reviews'
    },
    {
      linkName: 'Log out',
      linkIcon: 'pi pi-sign-out',
    },
  ]).asReadonly();
  isUserImageError = signal<boolean>(false);
  
  constructor() {
    this.appStore.initGetUserData().subscribe();
  }

  handleIsLoadMenu(): void {
    this.isLoadMenu.set(!this.isLoadMenu());
  }
}
