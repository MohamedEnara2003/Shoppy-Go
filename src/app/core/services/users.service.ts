import { inject, Injectable } from '@angular/core';
import { SingleTonApiService } from './single-ton-api.service';
import { from, map, Observable } from 'rxjs';
import { UserType } from '../interfaces/user.type';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private readonly signleTonApi = inject(SingleTonApiService) ;
  private readonly table = "users" ;
  
  getUsers() : Observable<UserType[]> {
  return this.signleTonApi.select(this.table);
  }

  isExistingUser(id : string) : Observable<boolean> {
  const promise = this.signleTonApi.supabase.from(this.table)
  .select('id')
  .eq('id' , id)
  .single()
  return from(promise).pipe(map((res) => res.data?.id === id));
  }

  addUser(data : UserType) : Observable<UserType> {
  return this.signleTonApi.insert(this.table , data);
  }

}
