import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    isUserRegistered: boolean;
    isLoading: boolean;
    hideForm: boolean;
    
    constructor(private formBuilder: FormBuilder, private userService: UserService, private notify: NotificationService) {
        this.isUserRegistered = false;
        this.isLoading = false;
        this.hideForm = true;
        this.registerForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'username': ['', Validators.required],
            'email': ['', Validators.required],
            'contactNumber': ['', Validators.compose([
                Validators.required, Validators.minLength(10)
            ])],
            'address': ['', Validators.required],
            'password': ['', Validators.compose([
                Validators.required, Validators.minLength(6)
            ])],
            'confirmPassword': ['', Validators.compose([
                Validators.required
            ])]
        }, { validator: this.matchingPasswordValidator('password', 'confirmPassword') });
    }
    
    //matching password
    matchingPasswordValidator(p1: string, p2: string) {
        return (group: FormGroup) => {
            let p1Input = group.controls[p1];
            let p2Input = group.controls[p2];
            if(p1Input.value !== p2Input.value){
                p2Input.setErrors({ matchingPasswordValidation: true })
            } else {
                return p2Input.setErrors(null);
            }
        }
    }

    ngOnInit() {
    }
    
    //number validation
    // numberValidator(fc: FormControl): { [s: string]: boolean } {
    //     return fc.value.match(/[0-9\+\-\ ]/) ? null : { numberValidation: true };
    // }

    onSubmit(value: any) {
        console.log('form input - ', value);
        this.isLoading = true;
        this.userService.registerUser(value).subscribe(
            (res) => {
                if(res) {
                    this.hideForm = false;
                    this.isUserRegistered = true;
                    this.notify.showInfo('Login using new credentials', 'User registered!');
                } else {
                    this.notify.showError('Please try again', 'User registration failed');
                }
                this.isLoading = false;
            }
        );
    }
}
