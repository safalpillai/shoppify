import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ICartProduct, IAppState, IWishlist } from '../models';
import { NgRedux, select } from '@angular-redux/store';
import { ThunkWrapper } from '../store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() product: IProduct;
    @select() wishlisted: Observable<string[]>;
    @select() carted: Observable<string[]>;
    wishlistStatus: boolean;
    cartStatus: boolean;

    constructor(private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper,
        private userService: UserService, private router: Router, private notify: NotificationService) {
    }

    ngOnInit() {
        if(this.userService.isAuthenticated()) {
            this.wishlisted.subscribe(items => {
                // console.log(`store.wishlisted change subscription`);
                let _temp: string[] = [];
                items.forEach(item => {
                    _temp.push(item.toString());
                });
                // console.log(`card.component - wishlisted items - ${_temp} === ${this.product.productId}`);
                if(_temp.includes(this.product.productId)){
                    this.wishlistStatus = true;
                    // console.log(`product inside wishlisted`);
                } else {
                    this.wishlistStatus = false;
                    // console.log(`product inside wishlisted`);
                }
            });
            this.carted.subscribe(items => {
                // console.log(`store.carted change subscription`);
                let _temp: string[] = [];
                items.forEach(item => {
                    _temp.push(item.toString());
                });
                _temp.includes(this.product.productId) ? this.cartStatus = true : this.cartStatus = false;
            });
        }
    }

    addToCart(product: IProduct){
        if(this.userService.isAuthenticated()) {
            let model: ICartProduct = {
                productId: product.productId,
                title: product.title,
                quantity: 1,
                size: 7,
                price: product.price,
                imgSrc: product.imgSrc
            }
            this.ngRedux.dispatch<any>(this.thunk.addToCart(model));
        } else {
            this.sendToLogin();
        }
    }

    toggleWishlist(product: IProduct, status: boolean) {
        if(!status && this.userService.isAuthenticated()){
            console.log(`adding to wishlist`);
            let item: IWishlist = {
                productId: product.productId,
                title: product.title,
                size: 8,
                price: product.price,
                imgSrc: product.imgSrc
            }
            this.ngRedux.dispatch<any>(this.thunk.addToWishlist(item));
        } else if(status && this.userService.isAuthenticated()){
            console.log(`removing from wishlist - ${product.productId}`);
            this.ngRedux.dispatch<any>(this.thunk.removeFromWishlist(product.productId));
        } else {
            this.sendToLogin();
        }
    }

    sendToLogin() {
        this.router.navigate(['/profile/login']);
        this.notify.showInfo('Login to continue', 'Info');
    }
}
