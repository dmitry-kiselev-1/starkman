import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    {
        path: '', canActivateChild: [AuthGuardService], children: [
            {
                path: 'order', children: [
                    {path: '', component: OrderFormComponent, data: {title: 'Форма нового заказа'}},
                    {path: ':order_id', component: OrderFormComponent, data: {title: 'Форма заказа'}}
                ]
            },
            {
                path: 'category', children: [
                    {path: '', component: CategoryFormComponent, data: {title: 'Форма новой товарной категории'}},
                    {path: ':category_id', component: CategoryFormComponent, data: {title: 'Форма товарной категории'}}
                ]
            },
            {
                path: 'product', children: [
                    {path: ':category_id', component: ProductFormComponent, data: {title: 'Форма нового товара'}},
                    {path: ':category_id/:product_id', component: ProductFormComponent, data: {title: 'Форма товара'}}
                ]
            },
            {path: '**', component: PageNotFoundComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
