import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//loading bar
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
//ng6-toastr-notifications
import { ToastrModule } from 'ng6-toastr-notifications';
//routing
import { AppRoutingModule } from './app-routing.module';
//services
import { ProductService } from './product.service';
//directives
import { CustomTextboxDirective } from './custom-textbox.directive';
import { NumbersOnlyDirective } from './numbers-only.directive';
//guards
import { AuthGuard } from './auth.guard';
//store
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState } from './models';
import { store, ThunkWrapper } from './store';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CardComponent } from './card/card.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { KidsComponent } from './kids/kids.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationService } from './notification.service';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { DashLinksComponent } from './dash-links/dash-links.component';
import { ModifyUsernameDirective } from './modify-username.directive';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CartComponent,
        ProfileComponent,
        CardComponent,
        ProductComponent,
        CategoryComponent,
        MenComponent,
        WomenComponent,
        KidsComponent,
        LoginComponent,
        RegisterComponent,
        CustomTextboxDirective,
        NumbersOnlyDirective,
        DashboardComponent,
        WishlistComponent,
        OrdersComponent,
        DashLinksComponent,
        ModifyUsernameDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SlimLoadingBarModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgReduxModule,
    ],
    providers: [
        NotificationService,
        ProductService,
        UserService,
        AuthGuard,
        ThunkWrapper
    ],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.provideStore(store);
    }
}
