import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { FormBuilder, FormGroup,  Validators, FormArray } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { UploadProductImageComponent } from "./components/upload-product-image/upload-product-image.component";
import { AppStore } from '../../../../../store/app.store';
import { ProductVariantComponent } from "./components/product-variant/product-variant.component";
import { Product } from '../../../../../core/interfaces/products.type';

@Component({
  selector: 'app-upsert-product',
  imports: [
    SharedModule,
    UploadProductImageComponent,
    ProductVariantComponent
],
  template: `
    <section class="w-full h-screen fixed top-0 left-0 flex justify-center items-center z-20" 
      role="dialog" 
      aria-modal="true"
      aria-label="Product Form"
    >
      <div class="p-4 w-full h-[90%] sm:w-[70%] sm:h-[90vh] grid grid-cols-1 bg-gray-50 shadow shadow-black 
        rounded-box z-50"
      >
        <h1 class="font-bold capitalize text-2xl text-gray-950">
          Create Product
        </h1>
        <form [formGroup]="productForm" 
          (ngSubmit)="onSubmit()"  
          class="p-fluid h-full overflow-y-auto"  
          style="scrollbar-width: none;"
          aria-label="Product creation form"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-6 text-gray-800">Basic Information</h2>
              <div class="space-y-4">
                <div class="flex flex-col">
                  <label for="title" class="text-sm font-medium text-gray-700 mb-1">*Product Title</label>
                  <input 
                    id="title" 
                    type="text" 
                    pInputText 
                    formControlName="title"  
                    class="w-full"
                    aria-required="true"
                    aria-invalid="productForm.get('title')?.invalid"
                  />
                  @if (productForm.get('title')?.invalid && productForm.get('title')?.touched) {
                    <small class="text-red-500 text-xs mt-1" role="alert">
                      Product title is required
                    </small>
                  }
                </div>

                <div class="flex flex-col">
                  <label for="category" class="text-sm font-medium text-gray-700 mb-1">*Product Category</label>
                  <input 
                    id="category" 
                    type="text" 
                    pInputText 
                    formControlName="category" 
                    class="w-full"
                    aria-required="true"
                    aria-invalid="productForm.get('category')?.invalid"
                  />
                </div>

                <div class="flex flex-col">
                  <label for="type" class="text-sm font-medium text-gray-700 mb-1">*Product Type</label>
                  <input 
                    id="type" 
                    type="text" 
                    pInputText 
                    formControlName="type" 
                    class="w-full"
                    aria-required="true"
                    aria-invalid="productForm.get('type')?.invalid"
                  />
                </div>
                
                <div class="flex flex-col">
                  <label for="price" class="text-sm font-medium text-gray-700 mb-1">*Price</label>
                  <p-inputNumber 
                    id="price" 
                    formControlName="price" 
                    [min]="0" 
                    inputId="currency-egp" 
                    mode="currency" 
                    currency="EGP" 
                    locale="en-US" 
                    class="w-full"
                    aria-required="true"
                    aria-invalid="productForm.get('price')?.invalid"
                  />
                </div>

                <div class="flex flex-col">
                  <label for="discount" class="text-sm font-medium text-gray-700 mb-1">*Discount</label>
                  <p-inputNumber 
                    id="discount" 
                    formControlName="discount" 
                    [min]="0" 
                    inputId="percent" 
                    prefix="%"
                    class="w-full"
                    aria-required="true"
                    aria-invalid="productForm.get('discount')?.invalid"
                  />
                </div>  

                <div class="flex flex-col">
                  <label for="description" class="text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    id="description" 
                    pInputText 
                    formControlName="description" 
                    rows="5" 
                    class="w-full"
                    aria-label="Product description"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <app-product-variant [form]="productForm"/>
            <app-upload-product-image class="w-full"/>
          </div>
        </form>
        
        <div class="flex justify-end space-x-2 mt-6" role="group" aria-label="Form actions">
          <p-button 
            label="Cancel"  
            severity="secondary" 
            (click)="onCancel()" 
            class="px-4 py-2"
            aria-label="Cancel product creation"
          />
          <p-button 
            label="Save" 
            type="submit"  
            (click)="onSubmit()"
            [disabled]="productForm.invalid"
            class="px-4 py-2"
            aria-label="Save product"
          />
        </div>
      </div>
      <div class="w-full h-full bg-black opacity-50 top-0 left-0 fixed z-30" 
        role="presentation"
        aria-hidden="true"
      ></div>
    </section>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UpsertProductComponent  implements OnDestroy , OnInit{
  readonly appStore = inject(AppStore);
  productForm: FormGroup;

  constructor(private fb: FormBuilder , @Inject(DOCUMENT) document : Document) {
  document.body.style.overflow = 'hidden';
  }

  ngOnInit(): void {
    this.initProductFormGruop();
    this.initEditedProductInFrom();
  }

  private initEditedProductInFrom() : void {
    const editedProduct = this.appStore.editedProduct();
    if(editedProduct) {
    this.productForm.patchValue({...editedProduct});

    if (editedProduct.sizes && editedProduct.sizes.length > 0) {
        const sizesArray = this.productForm.get('sizes') as FormArray;
        sizesArray.clear();
        editedProduct.sizes.forEach(size => {
          sizesArray.push(this.fb.group({
            size_id: [size.size_id ?? 1, Validators.required],
            size_type: [size.size_type, Validators.required],
            size_stock: [size.size_stock, Validators.required]
          }));
        });
      }
    }
  }

  private initProductFormGruop() : void {
  this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      discount : [0] ,
      category: [{value : this.appStore.category() || '' , disabled : true}, Validators.required],
      type: [   '', Validators.required],
      rating: [1 , [Validators.required]],
      tags : [[]],
      stock_status : ['INSTOCK' , [Validators.required]] ,
      sizes : this.fb.array([]),
      stock: [0, [Validators.required]],
      brand : [''] ,
      color : [''] ,
    });
  }

  onSubmit() {
  const productForm = this.productForm.getRawValue();
  if (this.productForm.valid) {
  const product : Product = {...productForm,
  final_price : productForm.price - productForm.price * productForm.discount / 100,
  images : this.appStore.uploadedFiles().map((files) =>({img_url : files.file_url , img_name  : files.file_name}))
  };

  this.appStore.editedProduct() ?
  this.appStore.updateProduct(product) :
  this.appStore.createProduct(product) ;
  this.onCancel()
  }
  }

  onCancel() {
  this.appStore.closeUpsertProduct()
  this.productForm.reset();
  }

  ngOnDestroy(): void {
  document.body.style.overflow = 'auto';
  }
}
