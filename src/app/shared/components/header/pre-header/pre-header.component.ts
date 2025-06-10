import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pre-header',
  imports: [RouterModule],
  template: `
  <header aria-label="Announcement Bar" class="w-full bg-primary p-2 px-4 flex justify-center items-center">

    <div class="text-white font-medium text-[10px] line-clamp-2 md:text-xs">
      <p>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <a routerLink="/main/shop"
          class="font-bold text-white hover:text-gray-200 underline rounded duration-200 transition-all">
          Shop Now
        </a>
      </p>
    </div>

  </header>
  `,
})
export class PreHeaderComponent {

}
