export interface IProduct{
    productId: string,
    brand: string;
    title: string;
    price: number;
    category: string;
    imgSrc: string;
    sizesAvailable: string;
    color: string;
    material: string;
    description: string;
    rating: string;
}

export interface IUser{
    name: string;
    username: string;
    password: string;
    email: string;
    contactNumber: number;
    address: string;
    cart?: string;
    wishlist?: string;
    orders?: string;
}