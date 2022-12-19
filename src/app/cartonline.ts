export interface CartOnline {
    id: number;
    cartItems:CartItem[]

    date_initializeed:string,
    completed:boolean,
    transaction_id :string,
    customerid:number

    
  }
  export interface CartItem {
        id:number,
        quantity: number,
        date_added:string,
        product:number,
        cartid:number,
}
export interface deneme {
    id: number;
    cartItems:{
        id:number,
        quantity: number,
        date_added:string,
        product:number,
        cartid:number,
    }
    date_initializeed:string,
    completed:boolean,
    transaction_id :string,
    customerid:number
}

export interface newCartItem {
    'customer_id' :number;
    'cartItem':{
        'quantity':number;
        'product':number;
    }

}
export interface CartItemToBeDeleted {
    'customer_id' :number;
    'cartitem_id':number;

}