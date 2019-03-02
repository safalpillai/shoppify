import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { IProduct, ICartProduct, IAppState } from '../models';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';
import { NgRedux } from '@angular-redux/store';
import { ThunkWrapper } from '../store';

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
    @ViewChild('cartButton') cartButton: ElementRef;

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, 
        private userService: UserService, private router: Router, private notify: NotificationService, 
        private ngRedux: NgRedux<IAppState>, private thunk: ThunkWrapper) { 
        //get id parameter from url
        this.activatedRoute.params.subscribe((params) => {
            this.productId = params['id'];
            // console.log(`product.component - id retrieved from url params - ${this.productId}`);
        });
    }

    ngOnInit() {
        //request product details from db
        this.productService.getProduct(this.productId).subscribe((res) => {
            // console.log(`product.component - received response - ${res}`);
            this.productDetails = res;
            this.sizes = this.productDetails.sizesAvailable.split(",");
            // console.log('sizes - ', this.sizes);
            this.productReceived = true;
        });
    }
    
    //add to cart
    addToCart(product: IProduct){
        let _cartProduct: ICartProduct = {
            productId: parseInt(product.productId),
            title: product.title,
            quantity: 1,
            size: 7,
            price: product.price,
            imgSrc: product.imgSrc
        };
        if(this.userService.isAuthenticated()) {
            this.ngRedux.dispatch<any>(this.thunk.addToCart(_cartProduct));

        } else {
            this.router.navigate(['/profile/login']);
            this.notify.showInfo('Login to continue', 'Login');
        }
    }
}
