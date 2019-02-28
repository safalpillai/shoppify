
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
store.subscribe(() => {
    console.log(`app-state set`);
    localStorage.setItem('app-state', JSON.stringify(store.getState()));
});


//reducer
export function rootReducer(state: IAppState = initialState, action: Action): IAppState {
    switch(action.type) {
        case Actions.LOGIN_FULFILLED:
            console.log(`LOGIN_FULFILLED - ${action.payload}`);
            return Object.assign({}, state, {
                username: action.payload
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
    }
    return state;
}

//Thunk 
@Injectable({
    providedIn: 'root'
})
export class ThunkWrapper{
    static api_url = 'http://localhost:4000/user/';

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
}