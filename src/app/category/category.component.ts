import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../models';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    @Input() loadCategory: string;
    products: IProduct[];
    dataReceived: boolean = false;

    constructor(private productService: ProductService) { 
        
    }

    ngOnInit() {
        this.productService.getProducts(this.loadCategory).subscribe(res => {
            this.products = res;
            this.dataReceived = true;
        });
    }

}
