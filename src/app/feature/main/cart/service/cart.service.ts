import { inject, Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { Cart, CartRelations } from '../../../../core/interfaces/cart.type';
import { SingleTonApiService } from '../../../../core/services/single-ton-api.service';
import { ProductSize } from '../../../../core/interfaces/products.type';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private readonly TableName = "cart" ;
  private readonly singleTonApi = inject(SingleTonApiService) ;

  getCarts(user_id : string) : Observable<CartRelations []> {
    const promise = this.singleTonApi.supabase.from(this.TableName)
    .select(`id,created_at,user_id,product_id,quantity,size,product:product_id(*)`)
    .eq('user_id' , user_id)
    return from(promise).pipe(map((carts) => {
    return (carts.data || []).map((cart) => 
      ({...cart , product : Array.isArray(cart.product) ? cart.product[0] : cart.product})
      )
    }));
  }

  addToCart(data : Cart) : Observable<Cart> {
  return this.singleTonApi.insert(this.TableName , data);
  }

  updateQuantity(id: number, quantity : number) : Observable<{quantity : number}> {
  return this.singleTonApi.update(this.TableName , {quantity} ,id )
  }
  
  updateSize(id: number, size : ProductSize) : Observable<{size : ProductSize}> {
  return this.singleTonApi.update(this.TableName , {size} ,id );
  }

  deleteCart(id : number) : Observable<void> {
  return this.singleTonApi.deleteById(this.TableName , id);
  }

  deleteAllCart() : Observable<void> {
  return this.singleTonApi.deleteAllData(this.TableName);
  }

}
