import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    @select() cartQuantity: Observable<number>;
    showQuantity: boolean;

    constructor(private router: Router, private loadingBar: SlimLoadingBarService) {
        this.router.events.subscribe((event: Event) => this.navigationInterceptor(event));
    }

    ngOnInit() {
        this.cartQuantity.subscribe(count => count > 0 ? this.showQuantity = true : this.showQuantity = false);
    }

    navigationInterceptor(event) {
        if(event instanceof NavigationStart){
            this.loadingBar.start();
        }
        if(event instanceof NavigationEnd){
            this.loadingBar.complete();
        }
        if(event instanceof NavigationCancel || event instanceof NavigationEnd || event instanceof NavigationError){
            this.loadingBar.stop();
        }
    }
}
