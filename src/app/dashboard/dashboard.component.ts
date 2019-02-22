import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
    }
    
    logout(){
        this.userService.loggedOut();
        this.router.navigate(['/home/men']);
    }
}
