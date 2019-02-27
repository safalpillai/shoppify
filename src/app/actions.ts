//actions
export const FETCH_CART = 'FETCH_CART';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILED = 'FETCH_CART_FAILED';
export const ADD_TO_CART_START = 'ADD_TO_CART_START';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILED = 'ADD_TO_CART_FAILED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGOUT = 'LOGOUT';

//action creators
export const loginFulfilled = username => {
    return {
        type: LOGIN_FULFILLED,
        payload: username
    }
}
export const fetchCart = () => {
    return {
        type: FETCH_CART
    }
}
export const fetchCartSuccess = data => {
    return {
        type: FETCH_CART_SUCCESS,
        payload: data
    }
}
export const fetchCartFailed = () => {
    return {
        type: FETCH_CART_FAILED
    }
}
export const addToCartStart = productId => {
    return {
        type: ADD_TO_CART_START,
        payload: productId
    }
}
export const addToCartSuccess = id => {
    return {
        type: ADD_TO_CART_SUCCESS,
        payload: id
    }
}
export const addToCartFailed = () => {
    return {
        type: ADD_TO_CART_FAILED,
    }
}

