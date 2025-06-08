import { inject, Injectable } from '@angular/core';
import { SingleTonApiService } from '../../../../core/services/single-ton-api.service';
import { from, map, Observable } from 'rxjs';
import { Order, OrderItems, OrderRelations, OrderStatus } from '../../../../core/interfaces/orders.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly orderTableName = "orders" ;
  private readonly orderItemsTableName = "order_items" ;
  private readonly singleTonApi = inject(SingleTonApiService);
  
  addOrder(order : Order) : Observable<Order> {
  return this.singleTonApi.insert(this.orderTableName , order);
  }

  addOrderItems(order : OrderItems) : Observable<OrderItems> {
  return this.singleTonApi.insert(this.orderItemsTableName , order);
  }
  
  

  updatedOrderStatus(id : string , status : OrderStatus) : Observable<{status : OrderStatus}> {
  return this.singleTonApi.update(this.orderTableName , {status} , id)
  }
  
  getOrderItems(user_id : string) : Observable<OrderRelations[]> {
    const promise = this.singleTonApi.supabase
    .from(this.orderTableName)
    .select(`
      id,
      created_at,
      user_id,
      user_data,
      total_price,
      status,
      payment_methods,
      order_items!order_id (
        id,
        created_at,
        order_id,
        product_id,
        quantity,
        size,
        product:product_id (
          id,
          title,
          final_price,
          images,
          stock,
          sizes,
          created_at
        )
      )
    `)
    .order('created_at' , {ascending : true})
    if(user_id){
    promise.eq('user_id', user_id)
    }
    return from(promise).pipe(map((res) => {
      if(res.error) return []; 
      const orderRelations =  res.data.map((order) => {
      return {
        ...order,
        order_items: order.order_items.map((item: any) => ({
          ...item,
          product: Array.isArray(item.product) ? item.product[0] : item.product
        }
      )
      )
      }
      }
    ) 
      return orderRelations as OrderRelations[];
    }))
  }
  
  cancelOrder(id : string) : Observable<void> {
  return this.singleTonApi.deleteById(this.orderTableName , id)
  }

}

