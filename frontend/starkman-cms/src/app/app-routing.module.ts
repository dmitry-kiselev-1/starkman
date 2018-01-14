import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryFormComponent} from './components/category/category-form/category-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/category/', pathMatch: 'full' },
  /*{ path: '**', component: AppComponent },*/
  {
    path: 'category', children: [
      { path: ':category_url', component: CategoryFormComponent, data: {title: 'Карточка товарной категории'} },
      { path: '', redirectTo: '/category/', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
