import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ICartProduct, IAppState, IWishlist } from '../models';
import { NgRedux } from '@angular-redux/store';
import { ThunkWrapper } from '../store';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() product: IProduct;

    constructor(private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper) {
    }

    ngOnInit() {
    }

    addToCart(product: IProduct){
        let model: ICartProduct = {
            productId: product.productId,
            title: product.title,
            quantity: 1,
            size: 7,
            price: product.price,
            imgSrc: product.imgSrc
        }
        this.ngRedux.dispatch<any>(this.thunk.addToCart(model));
    }

    addToWishlist(product: IProduct) {
        let item: IWishlist = {
            productId: product.productId,
            title: product.title,
            size: 8,
            price: product.price,
            imgSrc: product.imgSrc
        }
        this.ngRedux.dispatch<any>(this.thunk.addToWishlist(item));
    }
}
