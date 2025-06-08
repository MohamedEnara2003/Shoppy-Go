import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkType } from '../../../interfaces/links.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-links',
  imports: [CommonModule , RouterModule],
  template: `
    <ul aria-label="Main List Links" role="menuitem" 
    class="w-full flex justify-around  items-center">
    @for (item of headerLinks(); track item) {
    <li >
    <a [href]="item.path" [routerLink]="item.path" 
    class=" hover:text-secondary duration-300 text-[10px] md:text-sm font-[500] flex flex-col  items-center "
    [ngClass]="item.class" routerLinkActive="text-secondary">
    <span class="lg:hidden " >
    <i [ngClass]="item.linkIcon"  style="font-size: 1.2rem;" ></i>
    </span>
    {{item.linkName}}
    </a>
    </li>
    }
    </ul>
  `,
})
export class MainLinksComponent {
  headerLinks = signal<LinkType[]>([
    {
      linkName: 'Home',
      linkIcon: 'pi pi-home',
      path: '/main/home',
    },
    {
      linkName: 'Shop',
      linkIcon: 'pi pi-shop',
      path: '/main/shop'
    },
    {
      linkName: 'Contact',
      linkIcon: 'pi pi-envelope',
      path: '/main/contact'
    },
    {
      linkName: 'About',
      linkIcon: 'pi pi-info-circle',
      path: '/main/about'
    }, 
    {
      linkName: 'Wishlist',
      linkIcon: 'pi pi-heart',
      path: '/main/wishlist',
      class: 'lg:hidden',
    }, 
    {
      linkName: 'Cart',
      linkIcon: 'pi pi-shopping-cart',
      path: '/main/cart',
      class: 'lg:hidden',
    }, 
  ]).asReadonly()
}
