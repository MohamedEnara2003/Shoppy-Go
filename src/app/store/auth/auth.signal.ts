import { inject } from "@angular/core";
import { patchState, signalStoreFeature, withMethods, withState } from "@ngrx/signals";
import { AuthService } from "../../feature/auth/service/auth.service";
import { Router } from "@angular/router";
import { catchError, EMPTY, from, Observable, of, switchMap, tap } from "rxjs";
import { authClient } from "../../../environment/environment";
import {takeUntilDestroyed  } from "@angular/core/rxjs-interop";
import { UserType } from "../../core/interfaces/user.type";


interface  AuthState {
    currentUser  : UserType | null;
    signUpErrorMsg : string ;
    signInErrorMsg : string ;
}

const initialAuthState : AuthState = {
    currentUser : null,
    signUpErrorMsg : "" ,
    signInErrorMsg : "" ,
}

export const AuthStore =  signalStoreFeature(
    withState(initialAuthState),
    withMethods((store) => {
    const authServie = inject(AuthService);
    const router = inject(Router);

    return {
    signWithGoogle() : void {
    authServie.signInWithGoogle();
    },


    signUp(fullName: string, email: string, password: string) : void {
    authServie.signUp(fullName , email , password).pipe(
    catchError((err : Error) => {
    patchState(store , ({signUpErrorMsg : err.message}))
    return EMPTY
    })
    ).subscribe({
    next : ({data , error}) => {
    if(!error && data){
    this.routeAuthCallBack();
    }
    }
    })
    },
    
    signIn(email: string, password: string) : void {
    authServie.signIn(email , password).pipe(
    catchError((err : Error) => {
    patchState(store , ({signInErrorMsg : err.message}))
    return EMPTY
    })
    ).subscribe({
    next : ({data , error}) => {
    if(!error && data){
    router.navigate(['/main/home'])
    }
    },
    })
    },

    signOut() : void {
    authServie.signOut();
    patchState(store , ({currentUser : null}));
    },

    initGetUserData() : Observable<UserType> {
        if(store.currentUser()) {
            return of(store.currentUser()!);
        }
        
        return from(authClient.getUser()).pipe(
            switchMap((session) => {
                const user = session.data.user;
                if(!user) {
                    return EMPTY;
                }
                const identity_data = user.identities?.at(0)?.identity_data;
                const currentUser: UserType = {
                    id: user.id,
                    full_name: identity_data?.['fullName'] || identity_data?.['name'],
                    email: user.email || user.new_email!,
                    phone: user.phone || user.new_phone,
                    avatar_url: identity_data?.['picture'] || identity_data?.['avatar_url'],
                }
                patchState(store, ({currentUser}));
                return of(currentUser);
            }),
            catchError(() => EMPTY),
            takeUntilDestroyed()
        );
    },
    
    routeAuthCallBack() : void {
    router.navigate(['/' , {outlets : { primary : 'main/auth/sign-up' , auth : 'call-back'}}]);
    }

    }
    })
)