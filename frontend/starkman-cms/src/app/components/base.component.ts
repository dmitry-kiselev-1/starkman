import { MatSnackBar } from "@angular/material";
import { AppError } from "../models/app-error";

export abstract class BaseComponent {

  protected componentTitle: string;

  constructor(protected snackBar: MatSnackBar) {}

  protected handleError(error: AppError) {
    const defaultMessage = "При выполнении операции произошла ошибка.";
    const repeatMessage = "Пожалуйста, повторите операцию позже.";

    console.error(error);
    this.snackBar.open((error.userMessage || defaultMessage) + " " + repeatMessage, 'ОК');
  }

  protected showInfo(message: string): void {
    this.snackBar.open(message, null, { duration: 3000 });
  }

  protected confirm(message: string, action: Function) {}

  private space = '_';
  private empty = 'y';
  private a = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
    'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ы': 'y', 'ь': this.empty, 'ъ': this.empty,
    'э': 'e', 'ю': 'yu', 'я': 'ya',
    ' ': this.space, '_': this.space, '`': this.space, '~': this.space, '!': this.space, '@': this.space,
    '#': this.space, '$': this.space, '%': this.space, '^': this.space, '&': this.space, '*': this.space,
    '(': this.space, ')': this.space,'-': this.space, '\=': this.space, '+': this.space, '[': this.space,
    ']': this.space, '\\': this.space, '|': this.space, '/': this.space,'.': this.space, ',': this.space,
    '{': this.space, '}': this.space, '\'': this.space, '"': this.space, ';': this.space, ':': this.space,
    '?': this.space, '<': this.space, '>': this.space, '№':this.space
  };

  protected toUrl(title) {
    return title
      ? (title.toLowerCase().split('').map((char) => { return this.a[char] || char }).join(""))
      : "";
  }

}

