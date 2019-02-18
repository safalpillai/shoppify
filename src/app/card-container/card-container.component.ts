import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models';

@Component({
    selector: 'app-card-container',
    templateUrl: './card-container.component.html',
    styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {
    products: IProduct[];
    constructor() { 
        this.products = [
            {
                id: '1',
                brand: 'adidas',
                title: 'adidas',
                price: 3000,
                category: 'adidas',
                imgSrc: '../assets/images/adidas1.jpeg',
                sizesAvailable: [],
                color: 'adidas',
                material: 'adidas',
                description: 'adidas',
            },
            {
                id: '2',
                brand: 'nike',
                title: 'nike',
                price: 3000,
                category: 'nike',
                imgSrc: '../assets/images/adidas2.jpeg',
                sizesAvailable: [],
                color: 'nike',
                material: 'nike',
                description: 'nike',
            },
            {
                id: '3',
                brand: 'puma',
                title: 'puma',
                price: 3000,
                category: 'puma',
                imgSrc: '../assets/images/adidas3.jpeg',
                sizesAvailable: [],
                color: 'puma',
                material: 'puma',
                description: 'puma',
            }
        ];
    }

    ngOnInit() {
    }

}
