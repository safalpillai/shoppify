import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../user.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    orderList: any;
    windowWidth: any;
    @HostListener('window: resize') onresize() {
        this.windowWidth = window.innerWidth;
        console.log(this.windowWidth);
    }
    
    constructor(private userService: UserService) {
        this.userService.getOrders(this.userService.getUser()).subscribe(res => {
            this.orderList = res[0].orders;
            // console.log(`orders.component - order list received - ${JSON.stringify(this.orderList, null, 2)}`);
        });
    }
    
    ngOnInit() {
        
    }

}
