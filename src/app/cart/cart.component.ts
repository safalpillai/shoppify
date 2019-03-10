import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, IProduct, IOrder } from '../models';
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
    _orders: IOrder[];

    constructor(private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper) {  
    }

    ngOnInit() {
        const getDate = () => {
            let today = new Date();
            const dateSetter = () => {
                let date = today.getDate();
                return date < 10 ? `0` + date : date;
            }
            const monthSetter = () => {
                let month = today.getMonth() + 1;
                return month < 10 ? `0` + month : month;
            }
            let date = dateSetter();
            let month = monthSetter();
            let year = today.getFullYear();
            return `${date}.${month}.${year}`;
        }
        let dateStr = getDate();
        this.isFetching.subscribe(() => {
            console.log(`cart.component - cart products change subscription`);
            this.cartProducts.subscribe(items => {
                this._orders = [];
                items.map(item => {
                    this._orders.push({
                        productId: item.productId,
                        title: item.title,
                        quantity: item.quantity,
                        size: item.size,
                        price: item.price,
                        imgSrc: item.imgSrc,
                        totalPrice: item.price * item.quantity, 
                        dated: dateStr
                    });
                });
            });
        });
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

    placeOrder() {
        // console.log(`cart.component - orders set - ${JSON.stringify(this._orders, null, 2)}`);
        this.ngRedux.dispatch<any>(this.thunk.orderPlaced(this._orders));
    }
}
