import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { ThunkWrapper } from '../store';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading: boolean;
    @select() storeInitialized: Observable<boolean>;

    constructor(private userService: UserService, private router: Router, 
        private formBuilder: FormBuilder, private notify: NotificationService, 
        private ngRedux: NgRedux<IAppState>, private thunkWrapper: ThunkWrapper) {
        this.isLoading = false;
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.storeInitialized.subscribe(loginStatus => {
            if(loginStatus) {
                console.log('init store subscription returned true'); 
                // this.notify.showSuccess('Check user dashboard for account details', 'Login successful');
                this.router.navigate(['/home/men']);
            }
        });
    }
    
    onSubmit(value: any) {
        this.isLoading = true;
        console.log('form input - ', value);
        this.userService.login(value).subscribe((res) => {
            // console.log(`login.component.onSubmit() - result returned - ${res}`);
            this.ngRedux.dispatch<any>(this.thunkWrapper.initializeStore(value.username));
            this.userService.loggedIn(res);
        }, (err) => {
            this.notify.showError('Username & password don\'t match', 'Login failed');
            this.loginForm.controls['password'].reset();
            this.isLoading = false;
        });
    }
}
