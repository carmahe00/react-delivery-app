
export interface Product{
    id?:string,
    name: string,
    description: string,
    image1?: string,
    image2?: string,
    image3?: string,
    idCategory?: string,
    price:number,
    quantity?: number,
    order?:{
        idOrder: number,
      idProduct: number,
      quantity: number,
      createdAt: string,
      updateAt: string
    }
}