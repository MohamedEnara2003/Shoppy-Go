import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-search',
  imports: [SharedModule],
  template: `
    <section class="w-full flex flex-col gap-1" aria-label="Search Section">
      <form aria-label="Search Field" role="search" (ngSubmit)="onSearch()">
        <div class="hidden md:inline-block">
          <p-iconfield>
            <input 
              pInputText 
              placeholder="What are you looking for?" 
              pSize="small"
              class="placeholder:text-xs"
              aria-label="Search input"
              name="search"
              type="search"
              autocomplete="off"
            />
            <p-inputicon class="pi pi-search" aria-hidden="true" />
          </p-iconfield>
        </div>

        <button 
          type="button" 
          class="md:hidden cursor-pointer hover:opacity-50 duration-200"
          aria-label="Open search"
        >
          <i class="pi pi-search" aria-hidden="true"></i>
        </button>
      </form>
    </section>
  `,
})
export class SearchComponent {
  onSearch() {
    // Implement search functionality
  }
}
