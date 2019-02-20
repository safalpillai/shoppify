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
    userRegistered: boolean;
    loading: boolean;
    hideForm: boolean;
    
    constructor(private formBuilder: FormBuilder, private userService: UserService) {
        this.hideForm = true;
        this.userRegistered = false;
        this.loading = false;
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
        this.loading = true;
        this.userService.registerUser(value).subscribe(
            (res) => {
                res ? this.userRegistered = true : this.userRegistered = false;
                this.loading = false;
                this.hideForm = false;
            }
        );
    }
}
