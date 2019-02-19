import { Component } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router, private loadingBar: SlimLoadingBarService) {
        this.router.events.subscribe((event: Event) => this.navigationInterceptor(event));
    }

    navigationInterceptor(event) {
        if(event instanceof NavigationStart){
            this.loadingBar.start();
        }
        if(event instanceof NavigationEnd){
            this.loadingBar.complete();
        }
        if(event instanceof NavigationCancel || event instanceof NavigationEnd){
            this.loadingBar.stop();
        }
    }
}
