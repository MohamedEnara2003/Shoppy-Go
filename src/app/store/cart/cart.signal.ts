import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals"
import { Cart, CartRelations } from "../../core/interfaces/cart.type"
import { computed, inject } from "@angular/core"
import { CartService } from "../../feature/main/cart/service/cart.service"
import { catchError, debounceTime, finalize, of, take, tap } from "rxjs"
import { Product, ProductSize } from "../../core/interfaces/products.type"
import { MessageService } from "primeng/api"


interface CartState {
    carts: CartRelations[];
    cartLoading: boolean;
    cartError: string | null;
    quantity : number,
    maxAllowedInCart : string ,
    updatingCart : CartRelations | null,
}

const initialCartState: CartState = {
    carts: [],
    cartLoading: false,
    cartError: null,
    quantity : 1 ,
    maxAllowedInCart : '' ,
    updatingCart : null
}

export const CartStore = signalStoreFeature(
    withState(initialCartState),
    withComputed((store) => { 
    return {
    cartsCount: computed<number>(() => store.carts().reduce((prev , cart) => prev += cart.quantity , 0 )),
    cartTotalPrice: computed<number>(() => store.carts().reduce((prev , cart) => 
    prev += cart.product.final_price * cart.quantity , 0)),
    }
    }), 
    withMethods((store) => {
        const cartService = inject(CartService);
        const messageService = inject(MessageService);

        return {
            // Integration with CartService
        loadCarts(user_id : string) : void {
            if(store.carts().length === 0){ 
            patchState(store, { cartLoading: true, cartError: null });
            cartService.getCarts(user_id).pipe(
                    take(1),
                    tap((carts) => patchState(store, {carts})),
                    catchError((error) => {
                    patchState(store, {cartError: error.message});
                    return of([]);
                    }),
                    finalize(() => {
                    patchState(store, {cartLoading: false });
                    })
            ).subscribe();
        }
        },

    quantityChange(quantity : number) : void {
        patchState(store , ({quantity}))
    },
    

    saveCartChanges(updatedQuantity : number , size : ProductSize ) : void {
        const existingCart = store.updatingCart();
        if(existingCart){
            const isExistingSize = existingCart.size?.size_type === size.size_type;
            const isExistingQuantity= existingCart.quantity === updatedQuantity;
            if(!isExistingQuantity) this.updateQuantity(existingCart , updatedQuantity); 
            if(!isExistingSize)this.updateSize(existingCart , size);

            const existingProductWithSize  = store.carts().find((cart) => 
                cart.size?.size_id === size.size_id && 
                cart.product.id === existingCart.product.id &&
                cart.id !== existingCart.id // Don't match with the same cart
            );
            
            if(existingProductWithSize){
                // Merge quantities
                const mergedQuantity = existingProductWithSize.quantity + updatedQuantity;
                
                // Update the existing cart item with merged quantity
                this.updateQuantity(existingProductWithSize, mergedQuantity);
                
                // Remove the cart item being updated
                this.deleteFromCart(existingCart.id!);
                
                // Update local state
                const carts = store.carts().filter(cart => cart.id !== existingCart.id);
                patchState(store, {carts});
            }

            this.handleEditProductCartModle(null);
        }
    },
    
    updateQuantity(existingCart : CartRelations , updatedQuantity : number) : void {
            cartService.updateQuantity(existingCart.id! , updatedQuantity).pipe(
            catchError(() => of(null))
            ).subscribe();
            const carts = store.carts().map((cart) => 
            cart.id === existingCart.id ? {...existingCart, quantity: updatedQuantity} : cart);
            patchState(store, {carts});
    },

    updateSize(existingCart : CartRelations , size : ProductSize) : void {
            cartService.updateSize(existingCart.id! , size).pipe(
            catchError(() => of(null))
            ).subscribe();
            const carts = store.carts().map((cart) => 
            cart.id === existingCart.id ? {...existingCart, size: size} : cart);
            patchState(store, {carts});
    },
    

    addNewCart(newCart : Cart , product : Product) : void{
        cartService.addToCart(newCart).pipe(
        take(1),
        tap((cart) => {
        if(!cart) return ;
        const carts = [...store.carts() , {...cart , product}];
        patchState(store, {carts});
        this.showToastMessage('success', 'Success', `${store.quantity()} Product successfully added to your cart.`);
        }),
        catchError(error => {
        this.showToastMessage('error', 'Error', 'Failed to add product to cart');
        return of(error.message);
        }),
        debounceTime(300),
        ).subscribe();
    },

    addToCart(product: Product, user_id: string, maxStock: number , size : ProductSize): void {
        if (!product.id ) return;
        const quantity = store.quantity();
        const product_id = product.id;

        // Early return if quantity is invalid
        if (quantity <= 0) {
            this.showToastMessage('error', 'Error', 'Invalid quantity');
            return;
        }

        const existingCart = store.carts().find(cart =>  {
        if(size){
        return cart.product_id === product_id && cart.size?.size_id === size.size_id
        }
        return cart.product_id === product_id
        });

        const newCart: Cart = { product_id, user_id, quantity , size : size};

        if (!existingCart) {
        // Add new item to cart
        this.addNewCart(newCart , product)
        return;
        }

        const existingSize = existingCart.size ;
        if(!existingSize) return ;
        const existingProductSize = existingSize.size_id === size.size_id ;
        
    
        // Update existing cart item
        const updatedQuantity = existingCart.quantity + quantity;

        if (updatedQuantity > maxStock) {
            this.showToastMessage('warn', 'Warning', `You've reached the maximum available stock for this product in 
            your cart | ${maxStock}`);
            return;
        }

        if(!existingProductSize){
        this.addNewCart(newCart , product);
        return
        }
        this.updateQuantity(existingCart, updatedQuantity);
        this.showToastMessage('success', 'Success', `${updatedQuantity} Product successfully added to your cart.`);
    },

    deleteFromCart(itemId : number) : void {
    if(itemId !== undefined){
    cartService.deleteCart(itemId).subscribe();
    patchState(store, (state) => ({
    carts: state.carts.filter(item => item.id !== itemId)
    }));
    }
    },
    
    deleteALLCart() : void {
    cartService.deleteAllCart().subscribe({
    next : () =>  patchState(store , {carts : []}) ,
    });
    },
    
    handleEditProductCartModle(updatingCart : CartRelations | null) : void {
    patchState(store , {updatingCart})
    },

    showToastMessage(severity : string , summary : string , detail : string) : void {
    messageService.add({severity, summary , detail });
    }

    }
    
    })
)
