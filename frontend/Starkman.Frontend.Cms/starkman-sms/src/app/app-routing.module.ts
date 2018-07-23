import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {
        path: 'order', canActivateChild: [AuthGuard], children: [
            {path: '', component: OrderFormComponent, data: {title: 'Форма нового заказа'}},
            {path: ':order_id', component: OrderFormComponent, data: {title: 'Форма заказа'}}
        ]
    },
    {
        path: 'category', canActivateChild: [AuthGuard], children: [
            {path: '', component: CategoryFormComponent, data: {title: 'Форма новой товарной категории'}},
            {path: ':category_id', component: CategoryFormComponent, data: {title: 'Форма товарной категории'}}
        ]
    },
    {
        path: 'product', canActivateChild: [AuthGuard], children: [
            {path: ':category_id', component: ProductFormComponent, data: {title: 'Форма нового товара'}},
            {path: ':category_id/:product_id', component: ProductFormComponent, data: {title: 'Форма товара'}}
        ]
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
