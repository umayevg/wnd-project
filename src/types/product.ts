import {User} from "./user.ts";

export interface IProduct {
    id: number;
    count?: number
    user?: User;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string;
}
