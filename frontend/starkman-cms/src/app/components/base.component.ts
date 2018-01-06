import {AppModule} from '../app.module';
import {Input} from '@angular/core';

export abstract class BaseComponent {

    @Input() isLoading = false;

    protected title = 'Starkman CMS';

    constructor() {}

    protected handleError(error) {
      console.error(error);
    }

    protected  showError(summary: string, detail?: string): void {}
    protected  confirm(message: string, action: Function) {}
}

