import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, IAppState } from '../models/models';
import { NgRedux } from '@angular-redux/store';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    static API_URL = 'http://localhost:4000/user';

    constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

    //get orders
    getOrders(user: string): Observable<any> {
        return this.http.get(`${UserService.API_URL}/getorders?user=${user}`).pipe(
            map(res => {
                // console.log(`user.service.getOrders() - response received - ${JSON.stringify(res, null, 2)}`);
                return res;
            })
        );
    }

    //check username
    checkUsername(query: string): Observable<any> {
        console.log(`user.service.checkUsername() - query - ${query}`);
        return this.http.get(`${UserService.API_URL}/checkusername?checkuser=${query}`).pipe(
            map(response => {return response})
        );
    }

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
    login(value): Observable<any> {
        const params = new HttpParams().set('username', value.username).set('password', value.password);
        return this.http.get(`${UserService.API_URL}/login`, {params}).pipe(
            map(res => {
                // console.log(`user.service.login() - result return - ${res}`);
                if(res) return res;
                else throw Error();
            })
        );
    }

    //on login 
    loggedIn(person: IUser) {
        localStorage.setItem('user', JSON.stringify(person));
        // console.log(`user.service.loggedIn() - localStorage user item - ${localStorage.getItem('user')}`);
    }

    //check if user is loggedIn
    isAuthenticated(): boolean {
        if(localStorage.getItem('user') === null) return false;
        else return true;
    }

    //get username
    getUser(): string {
        return (JSON.parse(localStorage.getItem('user'))).username;
    }

    //on logout
    loggedOut() {
        this.ngRedux.dispatch({type: 'LOGOUT'});
        localStorage.removeItem('user');
        localStorage.removeItem('app-state');
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
