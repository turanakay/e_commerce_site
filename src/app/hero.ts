export interface Hero {
    id: number;
    name: string;
    image : string;
    category: number;
    stock: number;
    score: number;
    purchase_count : string
    description: string;
    price: string;
  }
  export interface cartValues{
    howMany :number;
    totalPrice: number;
  }
  export interface Comments{

    stars:number,
    comment:string,
    date_added: string,
    customer:number,
    product:number,
    
  }
  export interface Comment{
    stars:number,
    comment:string,
    user_id:number,
    product_id:number
    approval_status:string
  }
  export interface Commentadmin{
    id:number
    stars:number,
    comment:string,
    user_id:number,
    product_id:number
    approval_status:string
  }
  export interface Name{
    name:string;
  }
  export interface Description{
    description:string;
  }
  export interface Price{
    price:string;
  }
  export interface Stock{
    stock:number
  }