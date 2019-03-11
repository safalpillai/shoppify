import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, fromEvent } from 'rxjs';
import { map, filter, tap, debounceTime, switchAll } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
    @select() cartQuantity: Observable<number>;
    showQuantity: boolean;
    hideSearchContainer: boolean;
    searchLoader: boolean = false;
    @ViewChild('searchBox') searchBox: ElementRef;

    constructor(private router: Router, private loadingBar: SlimLoadingBarService) {
        this.router.events.subscribe((event: Event) => this.navigationInterceptor(event));
        this.hideSearchContainer = true;
    }

    ngOnInit() {
        this.cartQuantity.subscribe(count => count > 0 ? this.showQuantity = true : this.showQuantity = false);
    }

    ngAfterViewInit() {
        const searchInputEntries$ = fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
            map((e: any) => e.target.value),
            filter((text: string) => text.length > 1),
            debounceTime(250),
            tap(() => this.searchLoader = true),
            map((query: string) => this.sendQuery(query)),
            // switchAll()
        );

        searchInputEntries$.subscribe(data => {
            console.log(`subscription - ${data}`);
        });
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

    showSearch() {
        this.hideSearchContainer = false;
    }
    hideSearch() {
        this.hideSearchContainer = true;
    }

    sendQuery(query: string) {
        console.log(`query - ${query}`);
    }
}
