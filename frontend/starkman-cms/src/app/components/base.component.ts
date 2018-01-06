export abstract class BaseComponent {

  protected componentTitle: string;

  constructor() {}

  protected handleError(error) {
    console.error(error);
  }

  protected  showError(summary: string, detail?: string): void {}
  protected  confirm(message: string, action: Function) {}
}

