import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from './models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    static API_URL = 'http://localhost:4000/user';

    constructor(private http: HttpClient) { }

    //get user details for dashboard
    getUserDetails(name: string): Observable<any> {
        const params = new HttpParams().set('username', name);
        return this.http.get(`${UserService.API_URL}/getdetails`, {params}).pipe(
            map(res => {
                console.log('user.service.getDetails() - response returned - ', res);
                return res;
            })
        )
    }

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

    //on login 
    loggedIn(username: string) {
        localStorage.setItem('username', username);
        console.log(`localstorage - ${localStorage.getItem('username')}`);
    }

    //check if user is loggedIn
    isAuthenticated(): boolean {
        if(localStorage.getItem('username') !== '') return true;
        else return false;
    }

    //get user
    getUser(): string {
        return localStorage.getItem('username');
    }

    //on logout
    loggedOut() {
        localStorage.setItem('username', '');
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
