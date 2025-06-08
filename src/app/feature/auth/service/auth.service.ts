import { Injectable } from '@angular/core';
import { authClient } from '../../../../environment/environment';
import { from, Observable } from 'rxjs';
import { UserType } from '../../../core/interfaces/user.type';
import { SingleTonApiService } from '../../../core/services/single-ton-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly table = "users";

  constructor(private readonly apiService: SingleTonApiService) {}

  signInWithGoogle() : Observable<any> {
    const promise = authClient.signInWithOAuth({
    provider : "google" ,
    options : {
    redirectTo : 'http://localhost:4200/main/auth/sign-up(auth:call-back)'
    }
  })
    return from(promise);
  }
  
  signInWithFaceBook() : Observable<any> {
    const promise = authClient.signInWithOAuth({
    provider : "facebook" ,
    options : {
    redirectTo : 'http://localhost:4200/main/auth/sign-up(auth:call-back)'
    }
  })
    return from(promise);
  }
  
  signUp(fullName : string, email : string , password : string) : Observable<any> {
    const promise = authClient.signUp({email , password , options : {
    data : {fullName}
    }})
    return from(promise);
  }

  signIn(email : string , password : string) : Observable<any> {
  const promise = authClient.signInWithPassword({email , password})
  return from(promise);
  }
  

  signOut() : void {
  authClient.signOut() ;
  }

  createUser(user: UserType): Observable<UserType> {
    return this.apiService.insert(this.table, user);
  }

}
