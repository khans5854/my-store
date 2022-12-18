export interface IRating {
    rate: number;
    count: number;
}

export interface IPrice{
    actualPrice?: number;
    discountedPrice: number;
    offer?:number
}

export interface IProduct {
    id: number;
    title: string;
    price: IPrice;
    description: string;
    category: string;
    image: string;
    rating: IRating;
    outOfStock?: Promise<() => void>
}