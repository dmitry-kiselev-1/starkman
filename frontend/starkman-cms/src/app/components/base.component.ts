export abstract class BaseComponent {

    public title = '';

    constructor() {}

    protected handleError(error) {
      console.error(error);
    }

    protected  showError(summary: string, detail?: string): void {}
    protected  confirm(message: string, action: Function) {}
}

