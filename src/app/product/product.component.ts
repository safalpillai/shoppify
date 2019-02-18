import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    productId: string;

    constructor(private activatedRoute: ActivatedRoute) { 
        this.activatedRoute.params.subscribe((params) => {
            this.productId = params['id'];
            console.log(`product.component - id retrieved from url params - ${this.productId}`);
        });
    }

    ngOnInit() {
    }
    
}
