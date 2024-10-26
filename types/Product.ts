export interface Product extends BaseEntity{
    name:string,
    image:string,
    description:string,
    price:number,
    categoryId:string
    rating?:number, 
}
