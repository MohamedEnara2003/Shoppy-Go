import { Component,  inject } from '@angular/core';
import { SharedModule } from '../../../../../../../shared/modules/shared.module';
import { AppStore } from '../../../../../../../store/app.store';
import { FileUploadEvent } from 'primeng/fileupload';


@Component({
  selector: 'app-upload-product-image',
  imports: [SharedModule],
  providers: [],
  template: `
    <div class="w-full flex flex-col gap-2 items-start p-2" role="group" aria-label="Product image upload">
      <p-fileupload 
        mode="basic" 
        name="demo[]" 
        [multiple]="true" 
        chooseIcon="pi pi-upload" 
        url="https://www.primefaces.org/cdn/api/upload.php" 
        accept="image/*" 
        maxFileSize="15000000" 
        (onUpload)="onUpload($event)" 
        [auto]="true" 
        chooseLabel="Upload Product Images"
        aria-label="Upload product images"
      />

      <ul class="w-full flex flex-wrap gap-5 p-1" role="list" aria-label="Uploaded product images">
        @for (item of appStore.uploadedFiles(); track item; let index = $index) {
          <li>
            <div class="size-20 relative">
              <img 
                [src]="item.previewUrl" 
                [alt]="item.file_name + ' preview'" 
                class="size-full object-contain rounded-xl duration-300 border border-gray-900 hover:scale-105"
                loading="lazy"
              />
              <p-button 
                class="absolute -right-2 -top-2"
                icon="pi pi-times" 
                [rounded]="true"  
                severity="danger" 
                size="small" 
                (click)="appStore.removeUploadedProductImage(item.file_name)"
                [attr.aria-label]="'Remove ' + item.file_name"
              />
            </div>
          </li>
        }
      </ul> 
    </div>
  `,
})
export class UploadProductImageComponent {
  readonly appStore = inject(AppStore)

  onUpload(event: FileUploadEvent): void {
    event.files.map((file) => {
      this.appStore.uploadProductImage(file)
    })
  }
  

}
