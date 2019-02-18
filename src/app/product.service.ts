import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    static API_URL = 'http://localhost:4200';

    constructor(private http: HttpClient) { }

    // get product 
    getProduct(id: string): Observable<any> {
        return this.http.get(`${ProductService.API_URL}`).pipe(
            map((res: Response) => {
                return res;
            })  
        );
    }
}
