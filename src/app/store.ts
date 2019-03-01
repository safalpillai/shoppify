
import { Injectable } from '@angular/core';
import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { IAppState, Action, IProduct } from './models';
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
    cartQuantity: 0
};

//persist store
let persistedStore: IAppState = localStorage.getItem('app-state') !== null  || localStorage.getItem('app-state') !== undefined
? JSON.parse(localStorage.getItem('app-state')) 
: initialState;
export const store: Store<IAppState> = createStore(rootReducer, persistedStore, applyMiddleware(thunk, createLogger({collapsed: true})));
store.subscribe(() => {
    localStorage.setItem('app-state', JSON.stringify(store.getState()));
    console.log(`local storage app-state set`);
});


//reducer
export function rootReducer(state: IAppState = initialState, action: Action): IAppState {
    switch(action.type) {
        case Actions.LOGIN_FULFILLED:
            console.log(`store.LOGIN_FULFILLED - ${action.payload}`);
            return Object.assign({}, state, {
                username: action.payload,
                isFetching: false
            });
        case Actions.LOGOUT:
            return initialState;
        case Actions.FETCH_CART_SUCCESS:
            // console.log(`FETCH_CART_SUCCESS - ${JSON.stringify(action.payload, null, 3)}`);
            return Object.assign({}, state, {
                cartProducts: action.payload[0].cart,
                wishlist: action.payload.wishlist,
                isFetching: false
            });
        case Actions.FETCH_CART_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                isError: true,
                error: 'Error encountered while fetching data'
            });
        case Actions.INCREMENT_START:
            return {...state, isFetching: true};
        case Actions.INCREMENT_SUCCESS: {
            console.log(`store.INCREMENT_SUCCESS - action.payload - ${action.payload}`);
            let _newState = state;
            let index = state.cartProducts.findIndex(item => item.productId === action.payload);
            _newState.cartProducts[index].quantity = _newState.cartProducts[index].quantity + 1;
            return {..._newState, isFetching: false};
        }
        case Actions.QUANTITY_UPDATE_FAILED:
            return {...state, isFetching: false, isError: true, error: 'quantity update failed utterly'};
        case Actions.DECREMENT_START:
            return {...state, isFetching: true}
        case Actions.DECREMENT_SUCCESS: {
            let _newState = {...state};
            let index = state.cartProducts.findIndex(item => item.productId === action.payload);
            _newState.cartProducts[index].quantity = _newState.cartProducts[index].quantity - 1;
            return {..._newState, isFetching: false};
        }
    }
    return state;
}

//Thunk 
@Injectable({
    providedIn: 'root'
})
export class ThunkWrapper{
    static api_url = 'http://localhost:4000/user/';
    
    //initialize store
    initializeStore(username: string) {
        console.log('store initialized with - ', username);
        store.dispatch(Actions.loginFulfilled(username));
        return dispatch => {
            axios.get(`${ThunkWrapper.api_url}/getcart?user=${store.getState().username}`)
            .then(res => {
                if(!res) console.log(`thunk initializeStore() - response error`);
                else {
                    console.log(`thunk initializeStore() - response received - ${res}`);
                    dispatch(Actions.fetchCartSuccess(res.data));
                }
            })
            .catch(err => {
                console.log(`initialize store error caught - ${err}`);
                dispatch(Actions.fetchCartFailed());
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
            axios.post(`${ThunkWrapper.api_url}/decrement?user=${store.getState().username}&productId=${product.productId}`)
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
}