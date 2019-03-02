//actions
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILED = 'FETCH_CART_FAILED';
export const ADD_TO_CART_START = 'ADD_TO_CART_START';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILED = 'ADD_TO_CART_FAILED';
export const INCREMENT_START = 'INCREMENT_START';
export const INCREMENT_SUCCESS = 'INCREMENT_SUCCESS';
export const QUANTITY_UPDATE_FAILED = 'QUANTITY_UPDATE_FAILED';
export const DECREMENT_START = 'DECREMENT_START';
export const DECREMENT_SUCCESS = 'DECREMENT_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REMOVE_CART_START = 'REMOVE_CART_START';
export const REMOVE_CART_SUCCESS = 'REMOVE_CART_SUCCESS';
export const REMOVE_CART_FAILED = 'REMOVE_CART_FAILED';

//action creators
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
export const loginFulfilled = username => {
    return {
        type: LOGIN_FULFILLED,
        payload: username
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

