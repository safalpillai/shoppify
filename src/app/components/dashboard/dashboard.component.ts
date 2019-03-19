import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    userDetails: any;

    constructor(private router: Router, private userService: UserService, private notify: NotificationService) { 
        let _person = JSON.parse(localStorage.getItem('user'));
        this.userDetails = {
            username: _person.username,
            name: _person.name,
            contactNumber: parseInt(_person.contactNumber),
            address: _person.address,
            email: _person.email
        }
    }

    ngOnInit() {
    
    }
}
