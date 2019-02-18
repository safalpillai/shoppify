import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CardComponent } from './card/card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { ProductComponent } from './product/product.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CartComponent,
        ProfileComponent,
        CardComponent,
        CardContainerComponent,
        ProductComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
