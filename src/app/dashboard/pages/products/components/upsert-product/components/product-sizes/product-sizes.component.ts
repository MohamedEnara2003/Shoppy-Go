import { Component, input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-product-sizes',
  imports: [SharedModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="form()" class="w-full space-y-4" role="group" aria-label="Product sizes">
      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-700 mb-1">Product Sizes</label>
        <div formArrayName="sizes" role="list" aria-label="Size list">
          @for (size of sizeControls.controls; track $index) {
            <div [formGroupName]="$index" 
              class="flex items-center gap-3 py-3 bg-gray-50 rounded-lg"
              role="listitem"
              [attr.aria-label]="'Size ' + ($index + 1)"
            >
              <div class="flex-1 flex-col">
                <label [for]="'size-' + $index" class="text-sm font-medium text-gray-700 mb-1">*Size</label>
                <input 
                  type="text" 
                  pInputText 
                  [id]="'size-' + $index" 
                  formControlName="size_type" 
                  placeholder="Size (e.g., S, M, L, XL)"
                  class="w-full"
                  aria-required="true"
                  [attr.aria-invalid]="size.get('size_type')?.invalid"
                />
              </div>
              <div class="flex-1 flex-col">
                <label [for]="'size-stock-' + $index" class="text-sm font-medium text-gray-700 mb-1">*Stock Size</label>
                <input 
                  type="number" 
                  pInputText 
                  [id]="'size-stock-' + $index" 
                  formControlName="size_stock" 
                  class="w-full"
                  placeholder="Stock"
                  aria-required="true"
                  [attr.aria-invalid]="size.get('size_stock')?.invalid"
                />
              </div>
              @if(sizeControls.length > 1){
                <button 
                  type="button" 
                  (click)="removeSize($index)" 
                  class="p-2 text-red-600 hover:text-red-800 transition-colors"
                  aria-label="Remove size"
                >
                  <i class="pi pi-trash" aria-hidden="true"></i>
                </button>
              }
            </div>  
          }
        </div>
        <p-button 
          type="button" 
          size="small" 
          (click)="addSize()"
          aria-label="Add new size"
        >
          Add Size
        </p-button>
      </div>
    </div>
  `,
  styles: ``
})
export class SizesComponent implements OnInit {
  form = input.required<FormGroup>();
  private fb = new FormBuilder();

  ngOnInit() {
    // Add initial size if the sizes array is empty
    if (this.sizeControls.length === 0) {
      this.addSize();
    }
  }

  get sizeControls() {
    return this.form().get('sizes') as FormArray;
  }

  addSize() {
    const sizeGroup = this.fb.group({
      size_id: [this.sizeControls.length + 1, [Validators.required]],
      size_type: ['', [Validators.required]],
      size_stock: [0, [Validators.required]]
    });
    this.sizeControls.push(sizeGroup);
    console.log(this.sizeControls.value);
    
  }

  removeSize(index: number) {
    this.sizeControls.removeAt(index);
  }
}
