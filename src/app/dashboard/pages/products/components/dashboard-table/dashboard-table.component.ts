import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ProductImagesType, ProductInventoryStatus } from '../../../../../core/interfaces/products.type';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { AppStore } from '../../../../../store/app.store';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-dashboard-table',
  imports: [SharedModule],
  providers: [ConfirmationService],
  template: `
    <section class="card" role="region" aria-label="Products Table">
      @if(!appStore.isProductsLoading()){ 
        <p-table
          [value]="appStore.products()"
          [paginator]="true"
          [rows]="5"
          [tableStyle]="{ 'min-width': '50rem' }"
          [rowsPerPageOptions]="[5, 10, 20]"
          aria-label="Products list"
        >
          <ng-template pTemplate="caption">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold">Products</h2>
            </div>
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th scope="col" style="width:15%">Name</th>
              <th scope="col" style="width:15%">Image</th>
              <th scope="col" style="width:15%">Price</th>
              <th scope="col" style="width:15%">Category</th>
              <th scope="col" style="width:15%">Rating</th>
              <th scope="col" style="width:15%">Status</th>
              <th scope="col" style="width:10%">Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product>
            <tr class="text-sm">
              <td><span class="line-clamp-1">{{ product.title }}</span></td>
              <td>
                <div class="size-16">
                  @if(product.images && product.images.length > 0 && product.images[0].img_url){
                    <img
                      [src]="product.images[0].img_url"
                      [alt]="product.title + ' product image'"
                      class="size-full object-contain"
                      loading="lazy"
                    />
                  } @else {
                    <div class="size-full bg-gray-200 rounded flex items-center justify-center" role="img" aria-label="No image available">
                      <i class="pi pi-image text-gray-400" aria-hidden="true"></i>
                    </div>
                  }
                </div>
              </td>
              <td>{{ product.price | currency:'EGP' }}</td>
              <td>{{ product.category }}</td>
              <td>
                <p-rating [(ngModel)]="product.rating" [readonly]="true" aria-label="Product rating" />
              </td>
              <td>
                <p-tag [value]="product.stock_status" [severity]="initStatus(product.stock_status)" aria-label="Stock status: {{ product.stock_status }}" />
              </td>
              <td>
                <div class="flex gap-2" role="group" aria-label="Product actions">
                  <p-button 
                    icon="pi pi-pencil" 
                    rounded 
                    raised 
                    size="small"
                    severity="info" 
                    (onClick)="appStore.getEditedProduct(product)"
                    aria-label="Edit product"
                  />
                  <p-confirmpopup />
                  <p-button 
                    icon="pi pi-trash" 
                    rounded 
                    raised 
                    size="small"
                    severity="danger" 
                    [outlined]="true"
                    (onClick)="confirm($event, product.id, product.images)"
                    aria-label="Delete product"
                  />
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="7" class="text-center p-4">
                No products found.
              </td>
            </tr>
          </ng-template>
        </p-table>
      } @else {
        <div class="w-full h-[60vh] flex justify-center items-center" role="status" aria-label="Loading products">
          <p-progress-spinner ariaLabel="Loading products" [style]="{ width: '120px', height: '120px' }" />
        </div>
      }
    </section>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardTableComponent {
  readonly appStore = inject(AppStore)

  constructor(private confirmationService: ConfirmationService) {
    this.appStore.getProducts()
  }

  confirm(event: Event, productId: string, images: ProductImagesType[]) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this product?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        const files_name = images.map((file) => file.img_name);
        this.appStore.deleteProduct(productId, files_name);
      },
    });
  }

  initStatus(status: ProductInventoryStatus): string {
    if(status === 'INSTOCK') return 'success';
    if(status === 'LOWSTOCK') return 'warn';
    if(status === 'OUTSTOCK') return 'danger';
    return 'Secondary';
  }
}
