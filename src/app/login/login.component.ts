import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IUser } from '../models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFailed: string;
    isLoading: boolean;

    constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
        this.isLoading = false;
        this.loginForm = this.formBuilder.group({
            'username': ['zumo', Validators.required],
            'password': ['123456', Validators.required]
        });
        this.loginFailed = '';
    }

    ngOnInit() {
    }
    
    onSubmit(value: any) {
        this.isLoading = true;
        this.loginFailed = '';
        console.log('form input - ', value);
        this.userService.login(value).subscribe((res) => {
            console.log(`login.component.onSubmit() - result returned - ${res.username}`);
            this.userService.loggedIn(res);
            this.router.navigate(['/profile/dashboard']);
        }, (err) => {
            this.loginFailed = 'Username & password doesn\'t match. Try again!';
            this.loginForm.controls['password'].reset();
            this.isLoading = false;
        });
    }
}
