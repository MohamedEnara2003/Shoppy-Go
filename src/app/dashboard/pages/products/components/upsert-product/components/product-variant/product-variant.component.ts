import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { SizesComponent } from "../product-sizes/product-sizes.component";
import { ProductInventoryStatus } from '../../../../../../../core/interfaces/products.type';
import { ProductTagsComponent } from "../product-tags/product-tags.component";

@Component({
  selector: 'app-product-variant',
  imports: [SharedModule, SizesComponent, ProductTagsComponent],
  template: `
    <div [formGroup]="form()" class="bg-white rounded-lg shadow-md p-6" role="group" aria-label="Product variant information">
      <h2 class="text-xl font-semibold mb-6 text-gray-800">Product Variant</h2>

      <div class="flex flex-col gap-4">
        @let category = form().get('category')?.value;
        @if (category === "Men Clothing" || category === "Women Clothing") {
          <app-product-sizes [form]="form()"/>
        } @else {
          <div class="flex flex-col">
            <label for="stock" class="text-sm font-medium text-gray-700 mb-1">*Stock</label>
            <p-inputNumber 
              id="stock" 
              formControlName="stock" 
              [min]="0" 
              class="w-full"
              aria-required="true"
              [attr.aria-invalid]="form().get('stock')?.invalid"
            />
          </div>
        }

        <div class="flex flex-col">
          <label for="stock_status" class="text-sm font-medium text-gray-700 mb-1">*Stock Status</label>
          <p-select 
            [options]="stock_status()" 
            id="stock_status" 
            formControlName="stock_status" 
            class="w-full"
            aria-required="true"
            [attr.aria-invalid]="form().get('stock_status')?.invalid"
          />
        </div>

        <app-product-tags [form]="form()"/>

        <div class="flex flex-col">
          <label for="color" class="text-sm font-medium text-gray-700 mb-1">Color</label>
          <input 
            pInputText 
            id="color" 
            formControlName="color"  
            class="w-full"
            aria-label="Product color"
          />
        </div>

        <div class="flex flex-col">
          <label for="brand" class="text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input 
            pInputText 
            id="brand" 
            formControlName="brand"  
            class="w-full"
            aria-label="Product brand"
          />
        </div>

        <div class="flex flex-col">
          <label for="rating" class="text-sm font-medium text-gray-700 mb-1">Rating</label>
          <p-rating 
            formControlName="rating" 
            [stars]="5" 
            [cancel]="false"
            aria-label="Product rating"
          />
        </div>
      </div>
    </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductVariantComponent {
  stock_status = signal<ProductInventoryStatus[]>(['INSTOCK', 'LOWSTOCK', 'OUTSTOCK']);
  form = input.required<FormGroup>();
}
