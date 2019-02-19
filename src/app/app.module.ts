import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
