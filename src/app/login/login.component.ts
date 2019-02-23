import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
            if(res) {
                // console.log(`username saved - ${value.username}`);
                this.userService.loggedIn(value.username);
                this.router.navigate(['/profile/dashboard']);
            } else {
                this.loginFailed = 'Username & password doesn\'t match. Try again!';
                this.loginForm.controls['password'].reset();
                this.isLoading = false;
            }
        });
    }
}
