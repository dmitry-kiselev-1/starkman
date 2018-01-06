import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryEditComponent} from './components/category/category-edit/category-edit/category-edit.component';

const routes: Routes = [
  /*{ path: '', component: AppComponent, data: {title: 'Knight Frank'} },*/
  /*{ path: '**', component: AppComponent, data: {title: 'Knight Frank'} },*/
  {
    path: 'category', children: [
      { path: ':category_url', component: CategoryEditComponent, data: {title: 'Карточка товарной категории'} },
      { path: 'new', component: CategoryEditComponent, data: {title: 'Карточка товарной категории - новая', isNew: true} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
