import { Component, inject, signal } from '@angular/core';
import { NavListItemComponent } from "../../../shared/components/navigations/nav-list-item/nav-list-item.component";
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [NavListItemComponent, RouterModule],
  template: `
  <section 
    class="w-full grid grid-cols-1 gap-10 mb-5 min-h-[60vh]" 
    role="main" 
    aria-label="404 Not Found Page"
    tabindex="-1"
    #mainSection>
    <app-nav-list-item 
      [items]="navLinks()" 
      aria-label="Navigation breadcrumbs"/>

    <div class="w-full flex flex-col gap-15 items-center">
      <div class="w-full flex flex-col gap-4 items-center">
        <h1 
          class="text-primary text-3xl sm:text-4xl lg:text-6xl font-semibold" 
          id="error-title">404 Not Found</h1>
        <p 
          class="text-primary/50" 
          aria-labelledby="error-title">
          Your visited page not found. You may go home page.
        </p>
      </div>
      
      <button 
        type="button" 
        class="text-sm btn-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all"
        aria-label="Return to home page"
        (click)="navigateToHome()"
        (keydown.enter)="navigateToHome()"
        (keydown.space)="navigateToHome()">
        Back to home page
      </button>
    </div>
  </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    button:focus-visible {
      outline: 2px solid var(--color-secondary);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      button {
        transition: none;
      }
    }
  `]
})
export class NotFoundComponent {
  private readonly router = inject(Router);
  
  navLinks = signal<MenuItem[]>([
    {label: 'Home', routerLink: '/main/home'},
    {label: '404 Error'}
  ]);

  navigateToHome() {
    this.router.navigateByUrl('/');
  }
}
