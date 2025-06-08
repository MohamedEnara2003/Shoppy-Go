import { Injectable, signal } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {


  first = signal<number>(0);
  rows = signal<number>(10);
  
  onPageChange(event: PaginatorState) : void{
    this.first.set(event.first ?? 0)
    this.rows.set(event.rows ?? 0)
    
  }
}
