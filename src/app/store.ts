import { Injectable } from '@angular/core';
import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { IAppState, Action, IProduct, ICartProduct, IWishlist } from './models';
import axios from 'axios';
import * as Actions from './actions';

//initial state
export const initialState: IAppState = {
    username: '',
    cartProducts: [],
    wishlist: [],
    isFetching: false,
    isError: false,
    error: '',
    cartQuantity: 0,
    cartAmount: 0,
    wishlisted: [],
    carted: [],
    storeInitialized: false
};

//persist store
let persistedStore: IAppState = localStorage.getItem('app-state') !== null  || localStorage.getItem('app-state') !== undefined
? JSON.parse(localStorage.getItem('app-state')) 
: initialState;
export const store: Store<IAppState> = createStore(rootReducer, persistedStore, applyMiddleware(thunk, createLogger({collapsed: true})));
store.subscribe(() => {
    localStorage.setItem('app-state', JSON.stringify(store.getState()));
    // console.log(`STORE CHANGED!! - ${JSON.stringify(store.getState(), null, 2)}`);
});

//reducer
export function rootReducer(state: IAppState = initialState, action: Action): IAppState {
    switch(action.type) {
        case Actions.INIT_STORE: {
            return {...state, username: action.payload, isFetching: false};
        }
        case Actions.LOGOUT: {
            // console.log(`store.LOGOUT`);
            return initialState;
        }
        case Actions.INIT_STORE_SUCCESS: {
            let _newState = {...state};
            _newState.cartProducts = action.payload[0].cart;
            _newState.carted = action.payload[0].cart.map(items => {return items.productId.toString()});
            _newState.wishlist = action.payload[0].wishlist;
            _newState.wishlisted = action.payload[0].wishlist.map(items => {return items.productId.toString()});
            _newState.isFetching = false;
            _newState.storeInitialized = true;
            // console.log(`FETCH_CART_SUCCESS - new state - ${JSON.stringify(_newState.cartProducts, null, 3)}`);
            return utilityReducer(_newState);
        }
        case Actions.INIT_STORE_FAILED: {
            return {...state, isFetching: false, isError: true, error: 'Error encountered while fetching data'};
        }
        case Actions.INCREMENT_START:{
            return {...state, isFetching: true};
        }
        case Actions.INCREMENT_SUCCESS: {
            console.log(`store.INCREMENT_SUCCESS - action.payload - ${action.payload}`);
            let _newState = state;
            let index = state.cartProducts.findIndex(item => item.productId === action.payload);
            _newState.cartProducts[index].quantity = _newState.cartProducts[index].quantity + 1;
            _newState.isFetching = false;
            return utilityReducer(_newState);
        }
        case Actions.QUANTITY_UPDATE_FAILED: {
            return {...state, isFetching: false, isError: true, error: 'quantity update failed utterly'};
        }
        case Actions.DECREMENT_START: {
            return {...state, isFetching: true};
        }
        case Actions.DECREMENT_SUCCESS: {
            let _newState = {...state};
            let index = state.cartProducts.findIndex(item => item.productId === action.payload);
            _newState.cartProducts[index].quantity = _newState.cartProducts[index].quantity - 1;
            _newState.isFetching = false;
            return utilityReducer(_newState);
        }
        case Actions.REMOVE_CART_START: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case Actions.REMOVE_CART_FAILED: {
            return {...state, isFetching: false, isError: true, error: 'Item deletion failed'};
        }
        case Actions.REMOVE_CART_SUCCESS: {
            let _newState = {...state};
            _newState.cartProducts = _newState.cartProducts.filter(item => item.productId.toString() !== action.payload.toString());
            _newState.carted = _newState.carted.filter(item => item.toString() !== action.payload.toString());
            _newState.isFetching = false;
            return utilityReducer(_newState);
        }
        case Actions.ADD_TO_CART_START: {
            return {...state, isFetching: true};
        }
        case Actions.ADD_TO_CART_SUCCESS: {
            let _newState = {...state};
            let duplicate = state.cartProducts.filter(item => item.productId === action.payload.productId);
            let index = state.cartProducts.findIndex(item => item.productId === action.payload.productId);
            if(duplicate.length) {
                _newState.cartProducts[index].quantity = _newState.cartProducts[index].quantity + 1;
                // return {..._newState, isFetching: false};
                _newState.isFetching = false;
                return utilityReducer(_newState);
            }
            _newState.carted = _newState.carted.concat(action.payload.productId.toString());
            _newState.cartProducts = _newState.cartProducts.concat(action.payload);
            _newState.isFetching = false;
            return utilityReducer(_newState);
        }
        case Actions.ADD_TO_CART_FAILED: {
            return {...state, isFetching: false, isError: true, error: 'Error adding product to cart'};
        }
        case Actions.ADD_WISHLIST_START: {
            return {...state, isFetching: true};
        }
        case Actions.ADD_WISHLIST_SUCCESS: {
            // console.log(`rootReducer ADD_WISHLIST_SUCCESS - ${JSON.stringify(action.payload, null, 2)}`);
            let _newState = {...state};
            _newState.wishlist = _newState.wishlist.concat(action.payload);
            _newState.wishlisted = _newState.wishlisted.concat(action.payload.productId.toString());
            _newState.isFetching = false;
            return {..._newState};
        }
        case Actions.WISHLIST_FETCH_START: {
            return {...state, isFetching: true}
        }
        case Actions.WISHLIST_FETCH_SUCCESS: {
            let _newState = {...state};
            _newState.wishlist = action.payload[0].wishlist;
            // console.log(`rootReducer() = WISHLIST_FETCH_SUCCESS - ${JSON.stringify(action.payload[0].wishlist, null, 3)}`);
            _newState.wishlisted = action.payload[0].wishlist.map(items => {return items.productId.toString()});
            // console.log(`rootReducer WISHLIST_FETCH_SUCCESS - wishlisted items - ${_newState.wishlisted}`);
            _newState.isFetching = false;
            return {..._newState};
        }
        case Actions.WISHLIST_FAILED: {
            return {...state, isFetching: false, isError: true, error: 'error while fetching wishlist'};
        }
        case Actions.REMOVE_WISHLIST_START: {
            return {...state, isFetching: true};
        }
        case Actions.REMOVE_WISHLIST_SUCCESS: {
            console.log(`store.REMOVE_WISHLIST_SUCCESS - wishlisted - ${JSON.stringify(state.wishlisted)} === ${action.payload}`);
            return Object.assign({}, state, {
                wishlist: state.wishlist.filter(item => item.productId.toString() !== action.payload.toString()),
                wishlisted: state.wishlisted.filter(item => item !== action.payload.toString()),
                isFetching: false
            });
        }
        case Actions.REMOVE_WISHLIST_FAILED: {
            return Object.assign({}, state, {
                isError: true,
                error: 'error while removing item from wishlist',
                isFetching: false
            });
        }
    }
    return state;
}

//reducer utility to set cart quantity and cart amount
const utilityReducer = (oldState: IAppState): IAppState => {
    let _newState = {...oldState};
    let _amount = 0, _items = 0;
    for(let item of _newState.cartProducts){
        _items++;
        item.quantity > 1 ? _amount += item.quantity * item.price : _amount += item.price;
    }
    console.log(`cart quantity - ${_items}, cart amount - ${_amount}`);
    _newState.cartAmount = _amount;
    _newState.cartQuantity = _items;
    return _newState;
}

//thunk 
@Injectable({
    providedIn: 'root'
})
export class ThunkWrapper{
    static api_url = 'http://localhost:4000/user/';
    
    //initialize store
    initializeStore(username: string) {
        console.log('store initialized with - ', username);
        store.dispatch(Actions.initStore(username));
        return dispatch => {
            setTimeout(() => {
                axios.get(`${ThunkWrapper.api_url}/initializestore?user=${username}`)
                .then(res => {
                    if(!res) console.log(`thunk initializeStore() - response error`);
                    else {
                        // console.log(`thunk initializeStore() - response received - ${JSON.stringify(res.data, null, 2)}`);
                        dispatch(Actions.initStoreSuccess(res.data));
                    }
                })
                .catch(err => {
                    console.log(`initialize store error caught - ${err}`);
                    dispatch(Actions.initStoreFailed());
                });
            }, 3000);
        }
    }
    
    //add to cart
    addToCart(cartProduct: ICartProduct) {
        store.dispatch(Actions.addToCartStart());
        let _user = store.getState().username;
        return dispatch => {
            axios.post(`${ThunkWrapper.api_url}/addtocart`, {_user, cartProduct})
            .then(res => {
                if(res){
                    console.log(`thunk addToCart() - added to cart - ${res}`);
                    dispatch(Actions.addToCartSuccess(cartProduct));
                } else {
                    console.log(`thunk addToCart() - add to cart failed - ${res}`);
                    dispatch(Actions.addToCartFailed());
                }
            })
            .catch(err => {
                console.log(`thunk addToCart() - error caught while adding to cart - ${err}`);
                dispatch(Actions.addToCartFailed());
            });
        }
    }

    //remove from cart
    removeFromCart(product: IProduct) {
        store.dispatch(Actions.removeCartStart());
        return dispatch => {
            axios.post(`${ThunkWrapper.api_url}/removefromcart?user=${store.getState().username}&productid=${product.productId}`)
            .then(res => {
                if(res) {
                    console.log(`thunk removeFromCart() - product removal failed - ${res}`);
                    dispatch(Actions.removeCartSuccess(product.productId));
                } else {
                    console.log(`thunk removeFromCart() - decrement failed - ${res}`);
                    dispatch(Actions.removeCartFailed());
                }
            })
            .catch(err => {
                console.log(`thunk removeFromCart() - error caught while removing product - ${err}`);
                dispatch(Actions.removeCartFailed());
            });
        }
    }

    //increment 
    incrementCart(product: IProduct) {
        console.log(`store - product to increment - ${product.productId}`);
        store.dispatch(Actions.incrementStart());
        return dispatch => {
            axios.post(`${ThunkWrapper.api_url}/increment?user=${store.getState().username}&productid=${product.productId}`)
            .then(res => {
                if(res) {
                    console.log(`thunk incrementCart() - quantity updated - ${res}`);
                    dispatch(Actions.incrementSuccess(product.productId));
                } else {
                    console.log(`thunk incrementCart() - error received while updating product quantity`);
                    dispatch(Actions.quantityUpdateFailed());
                }
            })
            .catch(err => {
                console.log(`thunk incrementCart() - error caught while updating product quantity - ${err}`);
                dispatch(Actions.quantityUpdateFailed());
            });
        }
    }

    //decrement
    decrementCart(product: IProduct) {
        store.dispatch(Actions.decrementStart());
        return dispatch => {
            axios.post(`${ThunkWrapper.api_url}/decrement?user=${store.getState().username}&productid=${product.productId}`)
            .then(res => {
                if(res) {
                    console.log(`thunk decrementCart() - decrement done successfully - ${res}`);
                    dispatch(Actions.decrementSuccess(product.productId));
                } else {
                    console.log(`thunk decrementCart() - decrement failed - ${res}`);
                    dispatch(Actions.quantityUpdateFailed());
                }
            })
            .catch(err => {
                console.log(`thunk decrementCart() - error caught while decrementing quantity - ${err}`);
                dispatch(Actions.quantityUpdateFailed());
            });
        }
    }
    
    //fetch wishlist
    fetchWishlist(username: string) {
        store.dispatch(Actions.wishlistFetchStart());
        return dispatch => {
            axios.get(`${ThunkWrapper.api_url}/fetchwishlist?user=${username}`)
            .then(res => {
                // console.log(`thunk fetchWishlist() - ${res}`);
                dispatch(Actions.wishlistFetchSuccess(res.data));
            })
            .catch(err => {
                console.log(`thunk fetchWishlist() - error caught while fetching wishlist`);
                dispatch(Actions.wishlistFetchFailed());
            });
        }
    }

    //add to wishlist
    addToWishlist(item: IWishlist) {
        store.dispatch(Actions.addWishlistStart());
        let _user = store.getState().username;
        return dispatch => {
            axios.post(`${ThunkWrapper.api_url}/addtowishlist`, {_user, item})
            .then((res) => {
                if(res){
                    console.log(`thunk addToWishlist() - wishlist updated successfully - ${res}`);
                    dispatch(Actions.addWishlistSuccess(item));
                } else {
                    console.log(`thunk addToWishlist() - wishlist update failed - ${res}`);
                    dispatch(Actions.wishlistFailed());
                }
            })
            .catch(err => {
                console.log(`thunk addToWishlist() - error caught while adding to wishlist - ${err}`);
                dispatch(Actions.wishlistFailed());
            });
        }
    }

    //remove from wishlist
    removeFromWishlist(productId: string) {
        store.dispatch(Actions.removeWishlistStart());
        console.log(`thunk removeFromWishlist() - productid - ${productId} - store.wishlisted - ${JSON.stringify(store.getState().wishlisted)}`);
        let user = store.getState().username;
        return dispatch => {
            axios.post(`${ThunkWrapper.api_url}/removewishlist?user=${user}&productid=${productId}`)
            .then(res => {
                if(!res) {
                    console.log(`thunk removeWishlist() - error occured while removing wishlist - ${res}`);
                    dispatch(Actions.removeWishlistFailed());
                } else {
                    console.log(`thunk removeWishlist() - removing wishlist returned - ${res}`);
                    dispatch(Actions.removeWishlistSuccess(productId));
                }
            })
            .catch(err => console.log(`thunk removeWishlist() - error caught while removing wishlist - ${err}`));
        }
    }
}