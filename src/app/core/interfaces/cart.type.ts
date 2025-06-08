import { Product, ProductSize } from "./products.type";


export interface Cart {
    id? : number ,
    created_at?: string; 
    user_id : string 
    product_id : string;
    quantity : number ,
    size? : ProductSize
}

export interface CartRelations extends Cart{
    product : Product;
}