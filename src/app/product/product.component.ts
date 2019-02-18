import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { IProduct } from '../models';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    productId: string;
    productDetails: IProduct;
    productReceived: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { 
        //get id parameter from url
        this.activatedRoute.params.subscribe((params) => {
            this.productId = params['id'];
            console.log(`product.component - id retrieved from url params - ${this.productId}`);
        });
    }

    ngOnInit() {
        //request product details from db
        this.productService.getProduct(this.productId).subscribe((res) => {
            console.log(`product.component - received response - ${res}`);
            this.productDetails = res;
            this.productReceived = true;
        });
    }
    
}
