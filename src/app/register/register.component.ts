import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
    registerForm: FormGroup;
    isUserRegistered: boolean;
    isLoading: boolean;
    usernameLoader: boolean;
    usernameNotAvailable: boolean;
    usernameAvailable: boolean;
    hideForm: boolean;
    @ViewChild('usernameInput') usernameInput: ElementRef;
    
    constructor(private formBuilder: FormBuilder, private userService: UserService, private notify: NotificationService) {
        this.isUserRegistered = false;
        this.isLoading = false;
        this.hideForm = true;
        this.usernameLoader = false;
        this.usernameNotAvailable = false;
        this.usernameAvailable = false;
        this.registerForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'username': ['', Validators.compose([
                Validators.required, Validators.minLength(5)
            ])],
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

    ngAfterViewInit() {
        const userInput$ = fromEvent(this.usernameInput.nativeElement, 'keyup').pipe(
            map((e: any) => e.target.value),
            tap((query: string) => {
                if(query.length <= 4) {
                    this.usernameLoader = false;
                    this.usernameNotAvailable = false;
                    this.usernameAvailable = false;
                }
            }),
            filter((text: string) => text.length > 4),
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => {
                this.usernameLoader = true;
                this.usernameNotAvailable = false;
                this.usernameAvailable = false;
            }),
            map((query: string) => this.userService.checkUsername(query)),
            switchAll()
        );

        userInput$.subscribe(result => {
            console.log(`register.component - username check - ${result}`);
            if(result){
                this.usernameNotAvailable = false;
                this.usernameAvailable = true;
            } else {
                this.usernameNotAvailable = true;
                this.usernameAvailable = false;
            }
            this.usernameLoader = false;
        });
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
