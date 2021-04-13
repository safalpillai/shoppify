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
import { ProductService } from './services/product.service';
import { NotificationService } from './services/notification.service';
import { UserService } from './services/user.service';
//directives
import { CustomTextboxDirective } from './directives/custom-textbox.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { ModifyUsernameDirective } from './directives/modify-username.directive';
//guards
import { AuthGuard } from './guards/auth.guard';
//store
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState } from './models/models';
import { store, ThunkWrapper } from './redux-store/store';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CardComponent } from './components/card/card.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { MenComponent } from './components/men/men.component';
import { WomenComponent } from './components/women/women.component';
import { KidsComponent } from './components/kids/kids.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DashLinksComponent } from './components/dash-links/dash-links.component';

@NgModule({
    declarations: [
        AppComponent, HomeComponent, CartComponent, ProfileComponent, CardComponent, ProductComponent, 
        CategoryComponent, MenComponent, WomenComponent, KidsComponent, LoginComponent, 
        RegisterComponent, CustomTextboxDirective, NumbersOnlyDirective, DashboardComponent, 
        WishlistComponent, OrdersComponent, DashLinksComponent, ModifyUsernameDirective,
    ],
    imports: [
        BrowserModule, AppRoutingModule, HttpClientModule, SlimLoadingBarModule, ReactiveFormsModule, 
        FormsModule, BrowserAnimationsModule, ToastrModule.forRoot(), NgReduxModule,
    ],
    providers: [
        NotificationService, ProductService, UserService, AuthGuard, ThunkWrapper
    ],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.provideStore(store);
    }
}
