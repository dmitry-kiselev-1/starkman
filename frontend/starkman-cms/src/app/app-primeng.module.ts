import {NgModule} from '@angular/core';
import {DataTableModule, SharedModule, AccordionModule, SplitButtonModule, ButtonModule} from 'primeng/primeng';

@NgModule({
  imports: [ DataTableModule, SharedModule, AccordionModule, ButtonModule, SplitButtonModule ],
  exports: [ DataTableModule, SharedModule, AccordionModule, ButtonModule, SplitButtonModule ]
})
export class AppPrimengModule {}
