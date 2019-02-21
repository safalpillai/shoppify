import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    isUserRegistered: boolean;
    isLoading: boolean;
    isUserFailed: boolean;
    hideForm: boolean;
    
    constructor(private formBuilder: FormBuilder, private userService: UserService) {
        this.isUserRegistered = false;
        this.isLoading = false;
        this.isUserFailed = false;
        this.hideForm = true;
        this.registerForm = this.formBuilder.group({
            'name': ['safal', Validators.required],
            'username': ['safal', Validators.required],
            'email': ['safal', Validators.required],
            'contactNumber': ['344343', Validators.required],
            'address': ['safal', Validators.required],
            'password': ['safal', Validators.required],
            'confirmPassword': ['safal', Validators.required]
        });
    }

    ngOnInit() {
    }

    onSubmit(value: any) {
        console.log('form input - ', value);
        this.isLoading = true;
        this.userService.registerUser(value).subscribe(
            (res) => {
                if(res) {
                    this.hideForm = false;
                    this.isUserRegistered = true;
                } else {
                    this.isUserFailed = true;
                    setTimeout(() => {
                        this.isUserFailed = false;
                    }, 3000);
                }
                this.isLoading = false;
            }
        );
    }
}
