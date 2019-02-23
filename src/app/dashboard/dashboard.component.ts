import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IUser } from '../models';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    username: string;
    userDetails: IUser;

    constructor(private router: Router, private userService: UserService) { 
        this.username = this.userService.getUser();
        this.userService.getUserDetails(this.username).subscribe(res => {
            this.userDetails = res;
        });
    }

    ngOnInit() {
    
    }
    
    logout(){
        this.userService.loggedOut();
        this.router.navigate(['/home/men']);
    }
}
