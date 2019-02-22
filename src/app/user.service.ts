import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    static API_URL = 'http://localhost:4000/user';

    constructor(private http: HttpClient) { }

    //login
    login(value): Observable<boolean> {
        const params = new HttpParams().set('username', value.username).set('password', value.password);
        return this.http.get(`${UserService.API_URL}/login`, {params}).pipe(
            map(res => {
                if(res) return true;
                return false;
            })
        );
    }

    //register user
    registerUser(formInput): Observable<boolean>{
        let model = {
            name: formInput.name,
            username: formInput.username,
            password: formInput.password,
            email: formInput.email,
            contactNumber: formInput.contactNumber,
            address: formInput.address
        };
        console.log('user.service.registerUser() - form input - ', formInput);
        return this.http.post(`${UserService.API_URL}/register`, model).pipe(
            map(res => { 
                if(res) return true;
                return false;
             })
        )
    }
}
