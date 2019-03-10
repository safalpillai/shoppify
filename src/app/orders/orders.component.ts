import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IOrder } from '../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    orderList: any;
    
    constructor(private userService: UserService) {
        this.userService.getOrders(this.userService.getUser()).subscribe(res => {
            this.orderList = res;
            console.log(`orders.component - order list received - ${JSON.stringify(this.orderList, null, 2)}`);
        });
    }
    
    ngOnInit() {
        
    }

}
