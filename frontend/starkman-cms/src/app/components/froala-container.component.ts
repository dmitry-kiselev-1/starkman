import { Category } from "../models/page/category.model";
import { Page } from "../models/page/page.model";
import { BaseComponent } from "./base.component";

declare var $ :any;

export abstract class FroalaСontainerComponent extends BaseComponent {

  public entity: Page = {} as Page;

  constructor() { super(); }

  public froalaOptions: any = {
    placeholder: "Description (описание категории на русском)",
    height: 300,
    toolbarButtons: ['save', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
    toolbarButtonsXS: ['save', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
    toolbarButtonsSM: ['save', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
    toolbarButtonsMD: ['save', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html']

    /*toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html']*/
  }

  public froalaInit() {
    $.FroalaEditor.DefineIcon('save', {NAME: 'check'});
    $.FroalaEditor.RegisterCommand('save', {
      title: 'Сохранить',
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: () => {
        /* $('#htmlEditor').froalaEditor('html.set', 'My custom paragraph.'); */
        let htmlEditorContent = $('#htmlEditor').froalaEditor('html.get');
        this.entity.Description = htmlEditorContent;
        this.froalaEditorContent = htmlEditorContent;
      }
    });
  }

  public descriptionSelectedTabIndex: number;
  public froalaEditorContent: string;

  public  descriptionSelectedTabChange(tab)
  {
    if (tab.index == 2)
    {
      this.froalaEditorContent = this.entity.Description;
    }
  }
}

