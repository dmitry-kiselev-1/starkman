import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRootComponent} from './components/layout/app-root.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialDesignModule} from './material-design.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CategoryListComponent} from './components/category/category-list/category-list.component';
import {CategoryService} from './services/category.service';
import {CategoryFormComponent} from './components/category/category-form/category-form.component';
import {NotificationService} from './services/notification.service';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {OrderListComponent} from './components/order/order-list/order-list/order-list.component';
import {SidenavComponent} from './components/layout/sidenav/sidenav/sidenav.component';
import { PhotoListComponent } from './components/photo/photo-list/photo-list.component';
import { PhotoFormComponent } from './components/photo/photo-form/photo-form.component';
import {PhotoService} from './services/photo.service';
import { ProductListComponent } from './components/product/product-list/product-list/product-list.component';

@NgModule({
  declarations: [
    AppRootComponent,
    CategoryListComponent,
    CategoryFormComponent,
    OrderListComponent,
    SidenavComponent,
    PhotoListComponent,
    PhotoFormComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MaterialDesignModule,
    FlexLayoutModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  providers: [NotificationService, CategoryService, PhotoService],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
