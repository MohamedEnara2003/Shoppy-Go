import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template : `
  <section >
  <router-outlet />
  <router-outlet name="auth"/>
  </section>
  ` ,
})
export class AppComponent {
  title = 'Shoppy-Go';
  
}
