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
      aria-label="Users data table"
    >
      <ng-template #header>
        <tr>
          <th scope="col">User</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </ng-template>
      <ng-template #body let-user>
        <tr class="capitalize text-primary text-sm">
          <td>
            <div class="size-8 rounded-full flex justify-center items-center bg-secondary" 
            role="img" aria-label="User avatar">
              @if(user.avatar_url && isImageError() !== user.email){
                <img 
                  (error)="isImageError.set(user.email)"
                  [src]="user.avatar_url" 
                  [alt]="'Avatar of ' + user.full_name"
                  class="size-full object-cover rounded-full"
                  loading="lazy"
                />
              }@else{
                <i class="pi pi-user text-white" aria-hidden="true"></i>
              }
            </div>
          </td>
          <td>{{user.id}}</td>
          <td>{{user.full_name}}</td>
          <td>
            <a href="mailto:{{user.email}}" [attr.aria-label]="'Send email to' + user.full_name">
              {{user.email}}
            </a>
          </td>
        </tr>
      </ng-template>
    </p-table>
  </section>
  `,
})
export class UsersComponent {
  readonly appStore = inject(AppStore);
  isImageError = signal<string>('');
  
  constructor() {
    this.appStore.getUsers();
  }
}
