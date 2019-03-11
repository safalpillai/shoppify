import { Component, OnInit, Input, HostListener } from '@angular/core';
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
    isLoading: boolean;
    windowWidth: any;

    @HostListener('window: resize') onresize() {
        this.windowWidth = window.innerWidth;
        // console.log(`viewport width - ${this.windowWidth}`);
    }

    constructor(private productService: ProductService) { 
        this.isLoading = true;
        this.windowWidth = window.innerWidth;
    }

    ngOnInit() {
        this.productService.getProducts(this.loadCategory).subscribe(res => {
            this.products = res;
            this.dataReceived = true;
            this.isLoading = false;
        });
    }

}
