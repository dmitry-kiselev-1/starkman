import {NgModule} from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  exports: [
    FroalaEditorModule, FroalaViewModule
  ]
})export class FroalaModule {}

