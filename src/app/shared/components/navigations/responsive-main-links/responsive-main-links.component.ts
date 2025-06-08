import { Component, signal } from '@angular/core';
import { MainLinksComponent } from "../main-links/main-links.component";
import { fromEvent, map, pairwise, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-responsive-main-links',
  imports: [MainLinksComponent],
  template: `
  @if(isScroll()){ 
  <nav aria-label="Navigation Links"  role="navigation" 
  class="w-full fixed bottom-0 left-0 bg-gray-100 shadow shadow-primary p-2 animate-sideUp">
  <app-main-links class="lg:hidden" />
  </nav>
  }
  `,
})
export class ResponsiveMainLinksComponent {
  isScroll = signal<boolean>(true);

  constructor(){this.handleScrolling();}

  private handleScrolling() : void {
  fromEvent(window , 'scroll').pipe(
  map(() => window.scrollY),
  pairwise(),
  tap(([a , b]) => this.isScroll.set(a > b || a < 50 && b < 50 ? true : false)),
  takeUntilDestroyed()
  ).subscribe();
  }

}
