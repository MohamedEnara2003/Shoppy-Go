import { Product, ProductSize } from "./products.type";

export type OrderStatus = 'Pending' | 'Accepted' | 'Rejected'
export type PaymentMethods = 'Cash on delivery' | 'Bank'

export interface userOrderData {
name : string ,
email : string ,
phone : string ,
streetAddress : string ,
city : string ,
apartment? : string ,
} 

export interface Order {
    id? : string ;
    created_at?: string; 
    user_id : string ;
    user_data : userOrderData ;
    payment_methods : PaymentMethods ;
    total_price : number;
    status : OrderStatus;
}

export interface OrderItems {
    id? : string ;
    created_at?: string; 
    order_id : string ;
    product_id : string ;
    quantity : number;
    size? : ProductSize,
    product? : Product,
}

export interface OrderRelations extends Order{
    order_items : OrderItems[],
}