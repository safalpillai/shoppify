import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ICartProduct, IAppState, IWishlist } from '../../models/models';
import { NgRedux, select } from '@angular-redux/store';
import { ThunkWrapper } from '../../redux-store/store';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

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
    @select() isFetching;

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
                _temp.includes(this.product.productId) ? this.wishlistStatus = true : this.wishlistStatus = false;
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
    
    //wishlist
    toggleCart(product: IProduct, status: boolean, chosenSize: string){
        if(!status && this.userService.isAuthenticated()){
            let model: ICartProduct = {
                productId: product.productId,
                title: product.title,
                quantity: 1,
                size: parseInt(chosenSize.split(',')[0]),
                price: product.price,
                imgSrc: product.imgSrc
            }
            console.log(`adding to cart with size - ${parseInt(chosenSize.split(',')[0])}`);
            this.ngRedux.dispatch<any>(this.thunk.addToCart(model));
        } else if(status && this.userService.isAuthenticated()){
            console.log(`removing from cart - ${product.productId}`);
            this.ngRedux.dispatch<any>(this.thunk.removeFromCart(product));
        } else {
            this.sendToLogin();
        }
    }
    
    //cart
    toggleWishlist(product: IProduct, status: boolean, chosenSize: string) {
        if(!status && this.userService.isAuthenticated()){
            console.log(`adding to wishlist`);
            let item: IWishlist = {
                productId: product.productId,
                title: product.title,
                size: parseInt(chosenSize.split(',')[0]),
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
        this.notify.showError('Login to continue', 'Info');
    }
}
