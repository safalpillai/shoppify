import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { KidsComponent } from './kids/kids.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//category routes
const categoryRoutes: Routes = [
    { path: '', redirectTo: 'men', pathMatch: 'full' },
    { path: 'men', component: MenComponent },
    { path: 'women', component: WomenComponent },
    { path: 'kids', component: KidsComponent }
];
//profile routes
const profileChildren = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
//app routes
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, children: categoryRoutes },
    { path: 'profile', component: ProfileComponent, children: profileChildren },
    { path: 'cart', component: CartComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'category/:category', component: CategoryComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}