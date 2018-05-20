import { Category } from "../models/page/category";
import { Page } from "../models/page/page";
import { BaseComponent } from "./base.component";
import { OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";

declare var $ :any;

export abstract class FroalaСontainerComponent extends BaseComponent implements OnInit {

public entity: Page = {} as Page;

  constructor(protected snackBar: MatSnackBar) { super(snackBar); }

  ngOnInit(): void {
    this.froalaInit();
    this.entity.Description = this.entity.Description || "000";
  }

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

  public descriptionSelectedTabChange(tab)
  {
    if ((tab.index == 1) || (tab.index == 2))
    {
      this.entity.Description = this.entity.Description || ""
      this.froalaEditorContent = this.entity.Description;
    }
  }

}

