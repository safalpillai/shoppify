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

export interface ICartProduct {
    productId: number;
    quantity: number;
    size: number;
    price: number;
}

export interface IWishlist{
    productId: string;
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

export interface IAppState{
    username: string;
    cartProducts: ICartProduct[];
    wishlist: IWishlist[],
    isFetching: boolean,
    isError: boolean,
    error: string
}

export interface Action {
    type: string, 
    payload: any
}