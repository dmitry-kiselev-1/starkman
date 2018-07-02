import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { ProductFormComponent } from "./components/product/product-form/product-form.component";

const routes: Routes = [
  /*{ path: '', redirectTo: '/category/', pathMatch: 'full' },*/
  /*{ path: '**', component: AppComponent },*/
  {
    path: 'category', children: [
      { path: '', component: CategoryFormComponent, data: {title: 'Форма новой товарной категории'} },
      { path: ':category_id', component: CategoryFormComponent, data: {title: 'Форма товарной категории'} }
    ]
  },
  {
    path: 'product', children: [
      { path: ':category_id', component: ProductFormComponent, data: {title: 'Форма нового товара'} },
      { path: ':category_id/:product_id', component: ProductFormComponent, data: {title: 'Форма товара'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
