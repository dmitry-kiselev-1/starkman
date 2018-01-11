export abstract class BaseComponent {

  protected componentTitle: string;

  constructor() {}

  protected handleError(error) {
    console.error(error);
  }

  protected  showError(summary: string, detail?: string): void {}
  protected  confirm(message: string, action: Function) {}

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
    return title.toLowerCase().split('').map((char) => { return this.a[char] || char }).join("");
  }

}

