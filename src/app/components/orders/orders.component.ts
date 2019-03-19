import { Component, HostListener, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements AfterViewInit {
    orderList: any;
    windowWidth: any;
    startSlider: boolean = false;

    @HostListener('window: resize') onresize() {
        this.windowWidth = window.innerWidth;
        // console.log(this.windowWidth);
    }
    
    constructor(private userService: UserService) {
        this.userService.getOrders(this.userService.getUser()).subscribe(res => {
            this.orderList = res[0].orders;
            // console.log(`orders.component - order list received - ${JSON.stringify(this.orderList, null, 2)}`);
        });
    }
    
    ngAfterViewInit() {
        setTimeout(() => {
            this.startSlider = true;
        }, 1000);
    }
    
}
