import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRootComponent} from './components/app-root.component';
import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CategoryListComponent} from './components/category/category-list/category-list.component';
import {CategoryService} from './services/category.service';
import {CategoryEditComponent} from './components/category/category-edit/category-edit.component';
import {NotificationService} from './services/notification.service';

@NgModule({
  declarations: [
    AppRootComponent,
    CategoryListComponent,
    CategoryEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [NotificationService, CategoryService],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
