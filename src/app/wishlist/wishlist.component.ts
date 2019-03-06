import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, IWishlist } from '../models';
import { ThunkWrapper } from '../store';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
    @select() isFetching;
    @select() wishlist: Observable<IWishlist>;

    constructor(private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper, private userService: UserService) { }

    ngOnInit() {
        this.ngRedux.dispatch<any>(this.thunk.fetchWishlist(this.userService.getUser()));
        // this.wishlist.subscribe(items => console.log(`wishlist.component - wishlist items - ${items}`));
    }
    
    removeFromWishlist(product: IWishlist) {
        this.ngRedux.dispatch<any>(this.thunk.removeFromWishlist(product.productId));
    }
}
