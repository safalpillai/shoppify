import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//routing
import { AppRoutingModule } from './app-routing.module';
//services
import { ProductService } from './product.service';
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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SlimLoadingBarModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        ProductService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
