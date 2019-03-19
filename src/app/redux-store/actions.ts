//actions
export const INIT_STORE = 'INIT_STORE';
export const INIT_STORE_SUCCESS = 'INIT_STORE_SUCCESS';
export const INIT_STORE_FAILED = 'INIT_STORE_FAILED';

export const ADD_TO_CART_START = 'ADD_TO_CART_START';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILED = 'ADD_TO_CART_FAILED';

export const INCREMENT_START = 'INCREMENT_START';
export const INCREMENT_SUCCESS = 'INCREMENT_SUCCESS';
export const DECREMENT_START = 'DECREMENT_START';
export const DECREMENT_SUCCESS = 'DECREMENT_SUCCESS';
export const QUANTITY_UPDATE_FAILED = 'QUANTITY_UPDATE_FAILED';

export const LOGOUT = 'LOGOUT';

export const REMOVE_CART_START = 'REMOVE_CART_START';
export const REMOVE_CART_SUCCESS = 'REMOVE_CART_SUCCESS';
export const REMOVE_CART_FAILED = 'REMOVE_CART_FAILED';

export const ADD_WISHLIST_START = 'ADD_WISHLIST_START';
export const ADD_WISHLIST_SUCCESS = 'ADD_WISHLIST_SUCCESS';

export const REMOVE_WISHLIST_START = 'REMOVE_WISHLIST_START';
export const REMOVE_WISHLIST_SUCCESS = 'REMOVE_WISHLIST_SUCCESS';
export const REMOVE_WISHLIST_FAILED = 'REMOVE_WISHLIST_FAILED';

export const WISHLIST_FAILED = 'WISHLIST_FAILED';

export const WISHLIST_FETCH_START = 'WISHLIST_FETCH_START';
export const WISHLIST_FETCH_SUCCESS = 'WISHLIST_FETCH_SUCCESS';
export const WISHLIST_FETCH_FAILED = 'WISHLIST_FETCH_FAILED';

export const ORDER_START = 'ORDER_START';
export const ORDER_DONE = 'ORDER_DONE';
export const ORDER_FAILED = 'ORDER_FAILED';

//action creators
export const orderStart = () => {
    return {
        type: ORDER_START
    }
}
export const orderDone = () => {
    return {
        type: ORDER_DONE
    }
}
export const orderFailed = () => {
    return {
        type: ORDER_FAILED
    }
}

export const removeWishlistStart = () => {
    return {
        type: REMOVE_WISHLIST_START
    }
}
export const removeWishlistSuccess = productId => {
    return {
        type: REMOVE_WISHLIST_SUCCESS,
        payload: productId
    }
}
export const removeWishlistFailed = () => {
    return {
        type: REMOVE_WISHLIST_FAILED
    }
}

export const wishlistFetchStart = () => {
    return {
        type: WISHLIST_FETCH_START
    }
}
export const wishlistFetchSuccess = items => {
    return {
        type: WISHLIST_FETCH_SUCCESS,
        payload: items
    }
}
export const wishlistFetchFailed = () => {
    return {
        type: WISHLIST_FETCH_FAILED
    }
}

export const addWishlistStart = () => {
    return {
        type: ADD_WISHLIST_START
    }
}
export const addWishlistSuccess = item => {
    return {
        type: ADD_WISHLIST_SUCCESS,
        payload: item
    }
}
export const wishlistFailed = () => {
    return {
        type: WISHLIST_FAILED
    }
}

export const removeCartStart = () => {
    return {
        type: REMOVE_CART_START
    }
}
export const removeCartSuccess = productId => {
    return {
        type: REMOVE_CART_SUCCESS,
        payload: productId
    }
}
export const removeCartFailed = () => {
    return {
        type: REMOVE_CART_FAILED
    }
}

export const decrementStart = () => {
    return {
        type: DECREMENT_START
    }
}
export const decrementSuccess = productId => {
    return {
        type: DECREMENT_SUCCESS,
        payload: productId
    }
}
export const incrementStart = () => {
    return {
        type: INCREMENT_START
    }
}
export const incrementSuccess = productId => {
    return {
        type: INCREMENT_SUCCESS,
        payload: productId
    }
}
export const quantityUpdateFailed = () => {
    return {
        type: QUANTITY_UPDATE_FAILED
    }
}

export const initStore = username => {
    return {
        type: INIT_STORE,
        payload: username
    }
}
export const initStoreSuccess = data => {
    return {
        type: INIT_STORE_SUCCESS,
        payload: data
    }
}
export const initStoreFailed = () => {
    return {
        type: INIT_STORE_FAILED
    }
}

export const addToCartStart = () => {
    return {
        type: ADD_TO_CART_START
    }
}
export const addToCartSuccess = productId => {
    return {
        type: ADD_TO_CART_SUCCESS,
        payload: productId
    }
}
export const addToCartFailed = () => {
    return {
        type: ADD_TO_CART_FAILED,
    }
}

