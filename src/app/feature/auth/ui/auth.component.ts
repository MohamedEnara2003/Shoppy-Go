import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  template: `
  <section aria-label="Authentication Page" class="w-full grid grid-cols-1 md:grid-cols-2 p-2">
    <aside class="w-full md:h-[80vh] hidden md:inline-block" aria-hidden="true">
      <img [src]="banner" alt="Authentication Banner" class="size-full object-cover" loading="lazy">
    </aside>
    <main class="size-full flex justify-center" role="main">
      <div class="w-full lg:w-[400px] h-full">
        <router-outlet />
      </div>
    </main>
  </section>
  `,
})
export class AuthComponent {
  readonly banner: string = "https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//auth-banner.webp";
}
