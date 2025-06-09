import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { Order, OrderRelations, OrderStatus } from "../../core/interfaces/orders.type"
import { computed, inject } from "@angular/core"
import { OrderService } from "../../feature/main/orders/service/order.service"
import { AppStore } from "../app.store"
import { EMPTY, switchMap, tap, catchError, forkJoin, of } from "rxjs"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"


interface OrderState {
    orders : OrderRelations[],
    isLoading : boolean ,
    errorMsg : string,
}

const initialState : OrderState = {
    orders : [],
    isLoading : false ,
    errorMsg : '' ,
}

export const OrderStore  = signalStore(
    withState(initialState),
    withComputed((store) => {
    return{
    orderCount : computed<number>(() => store.orders().length),
    orderItemsCount : computed<number>(() => 
    store.orders().reduce((prev , vlaue) => prev += vlaue.order_items.length , 0)),
    
    orderItemsTotalPrice : computed<number>(() => 
    store.orders().reduce((prev , vlaue) => prev += vlaue.total_price , 0)),
    } 
    }),
    withMethods((store) => {
    const orderService = inject(OrderService);
    const appStore = inject(AppStore);
    return {
    
    addOrder(order: Order) : void {
    orderService.addOrder(order).pipe(
    switchMap((order) => {
    const order_id = order.id;

    if(!order_id) return EMPTY;
    
    const cartItems = appStore.carts();
    if (!cartItems.length) return EMPTY;

    const orderItemsObservables = cartItems.map((cart) => {
    const orderItems =  {
    order_id , 
    product_id : cart.product_id, 
    quantity : cart.quantity,
    size : cart.size,
    }
    const orders : OrderRelations[] = 
    [...store.orders() , {...order , order_items : [{...orderItems , product : cart.product}]} ];
    patchState(store , {orders});
    return orderService.addOrderItems(orderItems);
    })
    
    return forkJoin(orderItemsObservables).pipe(tap(() => appStore.deleteALLCart()));

    }),
    catchError((error) => {
    patchState(store , {errorMsg : error.message})
    return EMPTY;
    })
    ).subscribe();
    },
    
    getUserOrders(userId : string) : void {
    if(!userId || store.orders().length > 0) return ;
    patchState(store , {isLoading : true})
    orderService.getOrderItems(userId).pipe(
    tap((orders) => patchState(store, {isLoading : false, orders})),
    catchError((err) =>  {
    patchState(store , {isLoading : false , errorMsg : err.message})
    return of([])
    })
    ).subscribe();
    },
    
    getAllUsersOrders() : void {
    if(store.orders().length > 0) return ;
    patchState(store , {isLoading : true})
    orderService.getOrderItems('').pipe(
    tap((orders) => patchState(store, {isLoading : false, orders})),
    catchError((err) =>  {
    patchState(store , {isLoading : false , errorMsg : err.message})
    return of([])
    }), takeUntilDestroyed()
    ).subscribe();
    },
    
    cancelOrder(id : string) : void {
        orderService.cancelOrder(id).pipe(
            tap(() => {
            const orders = store.orders().filter(order => order.id !== id);
            patchState(store, {orders});
            }),
            catchError((error) => {
            patchState(store, { errorMsg: error.message });
            return EMPTY;
            })
        ).subscribe();
    },
    
    updateOrderStatus(orderId : string , status : OrderStatus) : void {
    orderService.updatedOrderStatus(orderId , status).pipe(
    tap(({status}) => {
    const orders = store.orders().filter((order) => order.id === orderId ? order.status = status: order);
    patchState(store , {orders});
    }), 
    catchError(() => EMPTY)
    ).subscribe()
    },

    orderStatusCount(orderStatus : OrderStatus) : number {
    return  store.orders().filter((order) => order.status === orderStatus).length
    }

}

})
)