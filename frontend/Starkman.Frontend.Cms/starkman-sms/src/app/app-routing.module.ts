import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { ProductFormComponent } from "./components/product/product-form/product-form.component";

const routes: Routes = [
  /*{ path: '', redirectTo: '/category/', pathMatch: 'full' },*/
  /*{ path: '**', component: AppComponent },*/
  {
    path: 'category', children: [
      { path: '', component: CategoryFormComponent, data: {title: 'Карточка новой товарной категории'} },
      { path: ':category_id', component: CategoryFormComponent, data: {title: 'Карточка товарной категории'} }
    ]
  },
  {
    path: 'product', children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: ':category_id', component: ProductFormComponent, data: {title: 'Карточка нового товара'} },
      { path: ':category_id/:product_id', component: ProductFormComponent, data: {title: 'Карточка товара'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
