import { CartOnline } from "./cartonline";
export interface Userlogin{
    user: User;
    token: string;

}
export interface User2{
    customer: User;
    token: string;
}
export interface Userdegisme{
    email:string;
    username: string;
    name:string;
    phone:string,
}
export interface Userdegismesifre{
    email:string;
    username: string;
    name:string;
    phone:string,
    password: string;
}
export interface User{

    email:string;
    username: string;
    customer: Customer;
    cart:CartOnline;
    orders:Orders[];
    name:string;
    phone:string,
    password: string;
    id: number;
    token: string;

}
export interface Customer{

    email:string;
    username: string;
    cart:CartOnline;
    orders:Orders[];
    name:string;
    phone:string,
    password: string;
    id: number;
    token: string;

}
export interface Orders{

    id:number,
    transaction_id:string,
    date_ordered:string,
    
    Status:string,
}
export interface Orderitems{
    quantity:number,
    date_added:string,
    product:number,
    order:number

}
export interface Password{
    password:string

}
export interface Phone{
    phone:string

}