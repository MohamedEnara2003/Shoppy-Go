import { Component, inject, signal } from '@angular/core';
import { AppStore } from '../../../../store/app.store';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-users',
  imports: [SharedModule],
  template: `
  <section aria-labelledby="users-table-title">
    <h2 id="users-table-title" class="sr-only">Users List</h2>
    <p-table 
      [value]="appStore.users()" 
      [paginator]="true"
      [rows]="5"
      [tableStyle]="{ 'min-width': '50rem' }"
      [rowsPerPageOptions]="[5, 10, 20]"
      [lazy]="true"
      [loading]="appStore.usersIsLoading()"
      aria-label="Users data table"
    >
      <ng-template pTemplate="header">
        <tr>
          <th scope="col">User</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-user>
        <tr class="capitalize text-primary text-sm">
          <td>
            <div class="size-10 rounded-full" 
            role="img" aria-label="User avatar">
              @if(user.avatar_url && !failedImages().includes(user.avatar_url)){
                <img 
                  (error)="handleImageError(user.avatar_url)"
                  [src]="user.avatar_url" 
                  [alt]="'Avatar of ' + user.full_name"
                  class="size-full object-cover rounded-full"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                />
              }@else{
                <div class="size-full rounded-full bg-secondary flex items-center justify-center">
                  <i class="pi pi-user text-white" aria-hidden="true"></i>
                </div>
              }
            </div>
          </td>
          <td>{{user.id}}</td>
          <td>{{user.full_name}}</td>
          <td>
            <a href="mailto:{{user.email}}" 
              [attr.aria-label]="'Send email to ' + user.full_name"
              class="hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
              {{user.email}}
            </a>
          </td>
        </tr>
      </ng-template>
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="4" class="text-center py-4">No users found</td>
        </tr>
      </ng-template>
    </p-table>
  </section>
  `,
})
export class UsersComponent {
  readonly appStore = inject(AppStore);
  failedImages = signal<string[]>([]);

  constructor() {
    this.appStore.getUsers();
  }

  handleImageError(imageUrl: string) {
    this.failedImages.update(urls => [...urls, imageUrl]);
  }

}
