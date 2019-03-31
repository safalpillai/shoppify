import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, fromEvent } from 'rxjs';
import { map, filter, tap, debounceTime, switchAll, distinctUntilChanged } from 'rxjs/operators';
import { ProductService } from './services/product.service';

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
    searchResults: any;
    noResults: boolean = false;

    constructor(private router: Router, private loadingBar: SlimLoadingBarService, private productService: ProductService) {
        this.router.events.subscribe((event: Event) => this.navigationInterceptor(event));
        this.hideSearchContainer = true;
    }

    ngOnInit() {
        this.cartQuantity.subscribe(count => count > 0 ? this.showQuantity = true : this.showQuantity = false);
    }

    ngAfterViewInit() {
        const searchInputEntries$ = fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
            map((e: any) => e.target.value),
            tap((text) => {
                if(text.length <= 1) {
                    this.searchLoader = false;
                    this.searchResults = null;
                }
            }),
            filter((text: string) => text.length > 1),
            debounceTime(250),
            distinctUntilChanged(),
            tap(() => {
                this.searchLoader = true;
                // console.log(`noResults = false`);
                this.noResults = false;
            }),
            map((query: string) => this.productService.searchProducts(query)),
            switchAll()
        );

        searchInputEntries$.subscribe(results => {
            // console.log(`search input subscription - ${JSON.stringify(results, null, 2)}`);
            if(results == null || results == '') {
                this.noResults = true;
                this.searchResults = false;
            } else {
                this.searchResults = results;
            }
            this.searchLoader = false;
        });
    }

    toProduct(productId: string) {
        this.hideSearch();
        this.router.navigate(['/product', productId]);
    }

    showSearch() {
        this.hideSearchContainer = false;
        setTimeout(() => {
            this.searchBox.nativeElement.focus();
        }, 500);
        console.log(`textbox focused`);
    }
    hideSearch() {
        this.hideSearchContainer = true;
        this.searchResults = [];
        this.searchBox.nativeElement.value = '';
    }

    navigationInterceptor(event) {
        if(event instanceof NavigationStart){
            this.loadingBar.start();
        }
        if(event instanceof NavigationEnd){
            this.loadingBar.complete();
        }
        if(event instanceof NavigationCancel || event instanceof NavigationError){
            this.loadingBar.stop();
        }
    }
}
