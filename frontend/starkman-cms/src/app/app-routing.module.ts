import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryFormComponent} from './components/category/category-form/category-form.component';

const routes: Routes = [
  /*{ path: '', component: AppComponent, data: {title: 'Knight Frank'} },*/
  /*{ path: '**', component: AppComponent, data: {title: 'Knight Frank'} },*/
  {
    path: 'category', children: [
      { path: ':category_url', component: CategoryFormComponent, data: {title: 'Карточка товарной категории'} },
      { path: 'new', component: CategoryFormComponent, data: {title: 'Карточка товарной категории - новая', isNew: true} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
