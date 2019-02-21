import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    static API_URL = 'http://localhost:4000/user';

    constructor(private http: HttpClient) { }

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
