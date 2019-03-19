import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
    registerForm: FormGroup;
    isUserRegistered: boolean;
    isLoading: boolean;
    usernameLoader: boolean;
    usernameNotAvailable: boolean;
    usernameAvailable: boolean;
    hideForm: boolean;
    @ViewChild('usernameInput') usernameInput: ElementRef;
    userInput$: Observable<boolean>;
    @ViewChild('showPassword') showPassword: ElementRef;
    passwordType: string;
    passwordIconClick: any;
    
    constructor(private formBuilder: FormBuilder, private userService: UserService, 
        private notify: NotificationService, private renderer: Renderer2) {
        this.passwordType = 'password';
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
        this.userInput$ = fromEvent(this.usernameInput.nativeElement, 'keyup').pipe(
            map((e: any) => e.target.value),
            tap((query: string) => {
                this.registerForm.setErrors({'invalid': true});
                if(query.length <= 4) {
                    this.usernameLoader = false;
                    this.usernameNotAvailable = false;
                    this.usernameAvailable = false;
                }
            }),
            filter((text: string) => text.length > 4),
            debounceTime(300),
            tap(() => {
                this.usernameLoader = true;
                this.usernameNotAvailable = false;
                this.usernameAvailable = false;
            }),
            map((query: string) => this.userService.checkUsername(query.toLowerCase())),
            switchAll()
        );

        this.userInput$.subscribe(result => {
            console.log(`register.component - username check - ${result}`);
            if(result){
                this.usernameNotAvailable = false;
                this.usernameAvailable = true;
                this.registerForm.setErrors(null);
            } else {
                this.usernameNotAvailable = true;
                this.usernameAvailable = false;
                this.registerForm.setErrors({'invalid': true});
            }
            this.usernameLoader = false;
        });

        //show password
        this.passwordIconClick = this.renderer.listen(this.showPassword.nativeElement, 'click', () => {
            let icon = this.showPassword.nativeElement;
            if(icon.getAttribute('data-status') == 0){
                this.renderer.setAttribute(icon, 'data-status', '1');
                this.passwordType = 'text';
            } else {
                this.renderer.setAttribute(icon, 'data-status', '0');
                this.passwordType = 'password';
            }
        });
    }

    ngOnDestroy() {
        //remove event listener on component destroy
        this.passwordIconClick();
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
        // console.log('form input - ', value);
        let submitFormWithLowerCaseUsername = Object.assign({}, value, {
            username: value.username.toLowerCase().trim()
        });
        // console.log(`new user submit - ${JSON.stringify(submitFormWithLowerCaseUsername)}`);
        this.isLoading = true;
        this.userService.registerUser(submitFormWithLowerCaseUsername).subscribe(
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
