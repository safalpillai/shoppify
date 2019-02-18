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

    // get product 
    getProduct(id: string): Observable<IProduct> {
        return this.http.get<IProduct>(`${ProductService.API_URL}/getproduct?productid=${id}`).pipe(
            map(res => {
                return res;
            })  
        );
    }
}
