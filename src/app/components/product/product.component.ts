import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct, ICartProduct, IAppState, IWishlist } from '../../models/models';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { NgRedux, select } from '@angular-redux/store';
import { ThunkWrapper } from '../../redux-store/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    productId: string;
    productDetails: IProduct;
    productReceived: boolean = false;
    sizes: Array<string> = new Array<string>();
    @select() wishlisted: Observable<string[]>;
    @select() carted: Observable<string[]>;
    wishlistStatus: boolean;
    cartStatus: boolean;
    @select() isFetching;
    cartText: string;
    setSize: number;

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, 
        private userService: UserService, private router: Router, private notify: NotificationService, 
        private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper) { 
        //get id parameter from url
        this.activatedRoute.params.subscribe((params) => {
            this.productId = params['id'];
            // console.log(`product.component - id retrieved from url params - ${this.productId}`);
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        });
    }

    ngOnInit() {
        //request product details from db
        this.productService.getProduct(this.productId.toString()).subscribe((res) => {
            // console.log(`product.component - received response - ${res}`);
            this.productDetails = res;
            this.sizes = this.productDetails.sizesAvailable.split(",");
            // console.log('sizes - ', this.sizes);
            this.productReceived = true;
        });

        if(this.userService.isAuthenticated()) {
            this.wishlisted.subscribe(items => {
                // console.log(`store.wishlisted change subscription - prId - ${this.productId}`);
                let _temp: string[] = [];
                items.forEach(item => {
                    _temp.push(item.toString());
                });
                _temp.includes(this.productId) ? this.wishlistStatus = true : this.wishlistStatus = false;
            });
            this.carted.subscribe(items => {
                // console.log(`store.carted change subscription`);
                let _temp: string[] = [];
                items.forEach(item => {
                    _temp.push(item.toString());
                });
                if(_temp.includes(this.productId)){
                    // console.log('added to cart');
                    this.cartStatus = true;
                    this.cartText = 'remove from cart';
                } else {
                    // console.log('add to cart');
                    this.cartStatus = false;
                    this.cartText = 'add to cart';
                }
            });
        } else {
            this.cartStatus = false;
            this.cartText = 'add to cart';
        }
    }
    
    //wishlist
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
    
    //cart
    toggleCart(product: IProduct, status: boolean, chosenSize: number){
        if(!status && this.userService.isAuthenticated()){
            if(chosenSize === undefined || chosenSize === null) {
                this.notify.showError('Select size first', 'Info');
                return false;
            } else {
                let model: ICartProduct = {
                    productId: product.productId,
                    title: product.title,
                    quantity: 1,
                    size: chosenSize,
                    price: product.price,
                    imgSrc: product.imgSrc
                }
                console.log(`adding to cart`);
                this.ngRedux.dispatch<any>(this.thunk.addToCart(model));
            }
        } else if(status && this.userService.isAuthenticated()){
            console.log(`removing from cart - ${product.productId}`);
            this.ngRedux.dispatch<any>(this.thunk.removeFromCart(product));
        } else {
            this.sendToLogin();
        }
    }

    sendToLogin() {
        this.router.navigate(['/profile/login']);
        this.notify.showInfo('Login to continue', 'Info');
    }
}
