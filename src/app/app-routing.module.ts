import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { MenComponent } from './components/men/men.component';
import { WomenComponent } from './components/women/women.component';
import { KidsComponent } from './components/kids/kids.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrdersComponent } from './components/orders/orders.component';

//category routes
const categoryRoutes: Routes = [
    { path: '', redirectTo: 'men', pathMatch: 'full' },
    { path: 'men', component: MenComponent },
    { path: 'women', component: WomenComponent },
    { path: 'kids', component: KidsComponent }
];
//profile routes
const profileChildren = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
//app routes
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, children: categoryRoutes },
    { path: 'profile', component: ProfileComponent, children: profileChildren },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'product/:id', component: ProductComponent },
    { path: 'category/:category', component: CategoryComponent },
    { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}