import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-women',
    templateUrl: './women.component.html',
    styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {
    category: string;

    constructor() { 
        this.category = 'women';
    }

    ngOnInit() {
    }

}
