import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, IWishlist, IProduct, ICartProduct } from '../models';
import { ThunkWrapper } from '../store';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, AfterViewInit {
    @select() isFetching;
    @select() wishlist: Observable<IWishlist>;
    @select() carted: Observable<string[]>;
    domList: QueryList<any>;
    @ViewChildren('rose') set content(content: QueryList<any>) {
        this.domList = content;
    }

    constructor(private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper, private userService: UserService) { }

    ngOnInit() {
        this.ngRedux.dispatch<any>(this.thunk.fetchWishlist(this.userService.getUser()));
    }
    
    removeFromWishlist(product: IWishlist) {
        this.ngRedux.dispatch<any>(this.thunk.removeFromWishlist(product.productId));
    }

    ngAfterViewInit() {
        let _temp: string[];
        this.carted.subscribe(items => {
            _temp = [];
           items.forEach(item => _temp.push(item));
           this.domList.notifyOnChanges;
        });

        this.domList.changes.subscribe(() => {
            console.log('cart updated');
            this.domList.forEach(item => {
                // console.log(`logger - ${_temp.includes(item.nativeElement.getAttribute('data-identification'))}`);
                if(_temp.includes(item.nativeElement.getAttribute('data-identification'))) {
                    item.nativeElement.setAttribute('data-cart', 'remove');
                    item.nativeElement.setAttribute('data-status', false);
                } else {
                    item.nativeElement.setAttribute('data-cart', 'add');
                    item.nativeElement.setAttribute('data-status', true);
                }
            });
        });
    }

    //wishlist
    toggleCart(product: IWishlist, event: Event){
        console.log(`toggling cart - status - ${event.srcElement.getAttribute('data-status')}`);
        if(event.srcElement.getAttribute('data-status').toString() === 'true'){
            console.log(`adding to cart`);
            let model: ICartProduct = {
                productId: product.productId,
                title: product.title,
                quantity: 1,
                size: product.size,
                price: product.price,
                imgSrc: product.imgSrc,
                totalPrice: product.price * 1
            }
            this.ngRedux.dispatch<any>(this.thunk.addToCart(model));
        } else {
            console.log(`removing from cart`);
            let _productStructure: IProduct = {
                productId: product.productId,
                title: product.title,
                price: product.price,
                imgSrc: product.imgSrc,
                brand: '',
                category: '',
                sizesAvailable: '',
                color: '',
                material: '',
                description: '',
                rating: ''
            }
            this.ngRedux.dispatch<any>(this.thunk.removeFromCart(_productStructure));
        }
    }
}
