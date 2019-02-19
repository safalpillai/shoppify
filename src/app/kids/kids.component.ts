import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-kids',
    templateUrl: './kids.component.html',
    styleUrls: ['./kids.component.scss']
})
export class KidsComponent implements OnInit {
    category: string;

    constructor() { 
        this.category = 'kids';
    }

    ngOnInit() {
    }

}
