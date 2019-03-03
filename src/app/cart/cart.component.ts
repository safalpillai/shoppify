import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, IProduct, ICartProduct } from '../models';
import { ThunkWrapper } from '../store';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    @select() isFetching;
    @select() cartProducts;
    @select() cartAmount;

    constructor(private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper) {
        
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
