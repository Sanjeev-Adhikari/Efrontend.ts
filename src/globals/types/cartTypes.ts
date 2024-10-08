import { Product } from "./productType";
import { Status } from "./types";

export interface Cart{
    Product : Product,
    quantity : number
}

export interface CartState{
    items: Cart[],
    status : Status
}