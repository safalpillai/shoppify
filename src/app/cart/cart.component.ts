import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, IProduct } from '../models';
import { ThunkWrapper } from '../store';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    @select() isFetching;
    cartProducts: any;

    constructor(private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper) {
        // console.log(`cart.component initialized - state - ${this.ngRedux.getState().cartProducts}`);
        this.cartProducts = this.ngRedux.getState().cartProducts;
        // console.log(`cart.component - cart products - ${JSON.stringify(this.cartProducts)}`);
    }

    ngOnInit() {
        
    }

    increment(product: IProduct) {
        this.ngRedux.dispatch<any>(this.thunk.incrementCart(product));
    }
    
    decrement(product: IProduct) {
        this.ngRedux.dispatch<any>(this.thunk.decrementCart(product));
    }

    removeFromCart(product: IProduct) {
        this.ngRedux.dispatch<any>(this.thunk.removeFromCart(product));
    }
}
