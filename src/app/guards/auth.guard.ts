import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router, private notify: NotificationService){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // console.log(`can activate - ${this.userService.isAuthenticated()}`);
        if(!this.userService.isAuthenticated()) {
            this.notify.showError('Login to continue', 'Info');
            this.router.navigate(['profile/login']);
            return false;
        }
        return true;
    }
}
