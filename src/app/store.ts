
import { Injectable } from '@angular/core';
import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { IAppState, Action } from './models';
import axios from 'axios';
import * as Actions from './actions';

export const initialState: IAppState = {
    username: '',
    cartProducts: [],
    wishlist: [],
    isFetching: true,
    isError: false,
    error: ''
};

export const store: Store<IAppState> = createStore(rootReducer, initialState, applyMiddleware(thunk, createLogger({collapsed: true})));

//reducer
export function rootReducer(state: IAppState = initialState, action: Action): IAppState {
    switch(action.type) {
        case Actions.LOGIN_FULFILLED:
            console.log(`login fulfilled user - ${action.payload}`);
            return {...state, username: action.payload}
        case Actions.LOGOUT:
            return initialState;
        case Actions.FETCH_CART:
            return {...state, isFetching: true}
        case Actions.FETCH_CART_SUCCESS:
            return Object.assign({}, state, {
                cartProducts: action.payload,
                isFetching: false
            });
        case Actions.FETCH_CART_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                isError: true,
                error: 'Error encountered while fetching data'
            });
    }
    return state;
}

//Thunk 
@Injectable({
    providedIn: 'root'
})
export class ThunkWrapper{
    static api_url = 'http://localhost:4000/products/';

    initializeStore() {
        
    }
    
    fetchCartProducts(username: string) {
        store.dispatch(Actions.fetchCart());
        return dispatch => {
            axios.get(`${ThunkWrapper.api_url}/getcart?user=${store.getState().username}`)
            .then(res => {
                if(!res) console.log(`initialize store no response`);
                else {
                    console.log(`initialize store response received - ${res}`);
                    dispatch(Actions.fetchCartSuccess(res.data));
                }
            })
            .catch(err => {
                console.log(`initialize store error caught - ${err}`);
                dispatch(Actions.fetchCartFailed());
            });
        }
    }
}