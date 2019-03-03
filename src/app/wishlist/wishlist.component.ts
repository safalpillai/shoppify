import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
    @select() isFetching;
    @select() wishlist;

    constructor() { }

    ngOnInit() {
    }
    
    // removeFromWishlist(product) {

    // }
}
