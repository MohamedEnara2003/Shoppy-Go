import { patchState, signalStoreFeature, withMethods, withState } from "@ngrx/signals";
import { UserType } from "../../core/interfaces/user.type";
import { inject } from "@angular/core";
import { UsersService } from "../../core/services/users.service";
import { catchError, EMPTY, of, switchMap, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


interface  UsersState {
    users : UserType[] ;
    user : UserType | undefined ;
    usersIsLoading : boolean ,
    usersError: string ,
}

const initialUsersState : UsersState = {
    users : [] ,
    user : undefined ,
    usersIsLoading : false ,
    usersError : '' ,
}

export const UsersStore =  signalStoreFeature(
    withState(initialUsersState),
    withMethods((store) => {
    const usersService = inject(UsersService);
    return {

    getUsers () : void {
    if(store.users().length > 0) return ;
    patchState(store , ({usersIsLoading : true}))
    usersService.getUsers().pipe(
    tap((users) => {
    patchState(store , ({usersIsLoading : false , users}))
    }),
    catchError((err : Error) => {
    patchState(store , ({usersIsLoading : false , usersError : err.message}))
    return of([]) ;
    }), takeUntilDestroyed()
    ).subscribe()
    },

    initAddUser(user : UserType) : void {
    usersService.isExistingUser(user.id).pipe(
    switchMap((isExistingUser) => {
    if(isExistingUser) return EMPTY;
    return usersService.addUser(user);
    })
    ).subscribe()
    }
    
    }
    })
)