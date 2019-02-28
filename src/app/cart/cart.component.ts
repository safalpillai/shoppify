import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { ICartProduct, IAppState } from '../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartProducts: any;

    constructor(private ngRedux: NgRedux<IAppState>) {
        console.log(`cart.component initialized - state - ${this.ngRedux.getState().cartProducts}`);
        this.cartProducts = this.ngRedux.getState().cartProducts;
    }

    ngOnInit() {
        
    }

}
