import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IUser } from '../models';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading: boolean;

    constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private notify: NotificationService) {
        this.isLoading = false;
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
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
            this.router.navigate(['/profile/dashboard']);
        }, (err) => {
            this.notify.showError('Username & password don\'t match', 'Login failed');
            this.loginForm.controls['password'].reset();
            this.isLoading = false;
        });
    }
}
