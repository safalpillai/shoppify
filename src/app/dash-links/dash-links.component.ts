import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dash-links',
    templateUrl: './dash-links.component.html',
    styleUrls: ['./dash-links.component.scss']
})
export class DashLinksComponent implements OnInit {
    location: string;

    constructor(private router: Router, private userService: UserService, private notify: NotificationService, private activatedRoute: ActivatedRoute) { 
        this.activatedRoute.params.subscribe(() => {
            this.location = activatedRoute.snapshot.url[0].path;
        });
    }

    ngOnInit() {
    }
    
    logout(){
        this.userService.loggedOut();
        this.router.navigate(['/home/men']);
        this.notify.showSuccess('Logged out successfully', 'Info');
    }
}
