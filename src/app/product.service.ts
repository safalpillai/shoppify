import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from './models';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    static API_URL = 'http://localhost:4000/products';

    constructor(private http: HttpClient) { }

    // get product by product id
    getProduct(id: string): Observable<IProduct> {
        return this.http.get<IProduct>(`${ProductService.API_URL}/getproduct?productid=${id}`).pipe(
            map(res => {
                return res;
            })  
        );
    }

    //get products by category
    getProducts(category: string): Observable<any> {
        // console.log(`product.service.getproducts() - query url - ${ProductService.API_URL}/getproducts?category=${category}`);
        return this.http.get(`${ProductService.API_URL}/getproducts?category=${category}`).pipe(
            map(res => {
                let products = <any>res;
                // console.log(`product.service - response received - ${products}`)
                return products;
            })
        )
    }
}
