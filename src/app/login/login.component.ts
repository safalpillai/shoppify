import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { ThunkWrapper } from '../store';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading: boolean;

    constructor(private userService: UserService, private router: Router, 
        private formBuilder: FormBuilder, private notify: NotificationService, 
        private ngRedux: NgRedux<IAppState>, private thunkWrapper: ThunkWrapper) {
        this.isLoading = false;
        this.loginForm = this.formBuilder.group({
            'username': ['safal', Validators.required],
            'password': ['123456', Validators.required]
        });
    }

    ngOnInit() {
    }
    
    onSubmit(value: any) {
        this.isLoading = true;
        console.log('form input - ', value);
        this.userService.login(value).subscribe((res) => {
            console.log(`login.component.onSubmit() - result returned - ${res.username}`);
            this.userService.loggedIn(res);
            this.notify.showSuccess('Check user dashboard for account details', 'Login successful');
            this.ngRedux.dispatch<any>(this.thunkWrapper.initializeStore(value.username));
            this.router.navigate(['/home/men']);
        }, (err) => {
            this.notify.showError('Username & password don\'t match', 'Login failed');
            this.loginForm.controls['password'].reset();
            this.isLoading = false;
        });
    }
}
