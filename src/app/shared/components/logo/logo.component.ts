import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterModule],
  template: `
  <a aria-label="Logo" role="link" routerLink="/" 
  class="text-xl font-semibold capitalize hover:text-secondary duration-200 transition-colors" >
  shoppy go
  </a>
  `,
})
export class LogoComponent {

}
