import { Component } from '@angular/core';
import { SelectLangComponent } from "../../select-lang/select-lang.component";

@Component({
  selector: 'app-pre-header',
  imports: [SelectLangComponent],
  template: `
  <header aria-label="Announcement Bar" class="w-full bg-primary p-2 px-4 flex justify-between items-center">
    <div class="text-white font-[300] text-[10px] line-clamp-2 md:text-xs">
      <p>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <a href="/shop" class="font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded">Shop Now</a>
      </p>
    </div>

    <app-select-lang />
  </header>
  `,
})
export class PreHeaderComponent {

}
