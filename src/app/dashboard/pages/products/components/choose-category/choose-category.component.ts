import { Component, inject, signal } from '@angular/core';
import { AppStore } from '../../../../../store/app.store';
import { SharedModule } from '../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-choose-category',
  standalone: true,
  imports: [SharedModule],
  template: `
    <main class="container mx-auto p-4" role="main" aria-label="Product Categories">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Choose a Product Category</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" role="list" aria-label="Available product categories">
        @for (category of categories(); track category.name) {
          <article 
            routerLink="/dashboard/products"  
            (click)="appStore.isOpenUpsertProduct(true, category.name)"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow
            duration-300 cursor-pointer hover:opacity-75"
            role="listitem"
            [attr.aria-label]="'Select ' + category.name + ' category'"
          >
            <figure class="relative h-48 hover:scale-110 duration-500">
              <img 
                [src]="category.image" 
                [alt]="category.name + ' category image'"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
            <div class="p-4">
              <h2 class="text-lg font-semibold text-gray-800">{{ category.name }}</h2>
            </div>
          </article>
        }
      </div>
    </main>
  `,
  styles: ``
})
export class ChooseCategoryComponent {
  readonly appStore = inject(AppStore);
  categories = signal<Array<{name: string, image: string}>>([
    { 
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500'
    },
    { 
      name: 'Furniture',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500'
    },
    { 
      name: 'Men Clothing',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500'
    },
    { 
      name: 'Women Clothing',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500'
    },
    { 
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=500'
    },
    { 
      name: 'Toys & Games',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=500'
    },
    { 
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=500'
    },
    { 
      name: 'Health & Beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500'
    },
    { 
      name: 'Supplies',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=500'
    },
  ]).asReadonly();
}
