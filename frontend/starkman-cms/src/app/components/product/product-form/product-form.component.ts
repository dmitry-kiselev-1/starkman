import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category } from '../../../models/page/category';
import { CategoryService } from '../../../services/category.service';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Photo } from '../../../models/page/photo';
import { PhotoService } from '../../../services/photo.service';
import { Product } from "../../../models/page/product";
import { ProductService } from "../../../services/product.service";

//declare var $ :any;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent /*extends BaseComponent implements OnInit*/ {

//   private product_url: string;
//   private category_url: string;
//
//   public entity: Product = new Product();
//
//   constructor(
//     private notificationService: NotificationService,
//     private photoService: PhotoService,
//     private activatedRoute: ActivatedRoute,
//     private router: Router,
//     private categoryService: CategoryService,
//     private productService: ProductService,
//     private snackBar: MatSnackBar) {
//     super();
//   }
//
//   ngOnInit() {
//     this.componentTitle = this.activatedRoute.snapshot.data['title'];
//
//     this.activatedRoute.params.subscribe(params => {
//       this.category_url = params['category_url'];
//       this.product_url = params['product_url'];
//
//       if (!this.product_url || !this.category_url) {
//         this.entity = new Product();
//       }
//       else {
//         //this.reload(this.query_url)
//       }
//     });
//
//     this.froalaInit();
//   }
//
//
//
// // Froala Init and fix:
//
//   public froalaOptions: any = {
//     placeholder: "Description (описание категории на русском)",
//     height: 300,
//     toolbarButtons: ['save', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
//     toolbarButtonsXS: ['save', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
//     toolbarButtonsSM: ['save', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
//     toolbarButtonsMD: ['save', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html']
//
//     /*toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html']*/
//   }
//
//   public froalaInit() {
//     $.FroalaEditor.DefineIcon('save', {NAME: 'check'});
//     $.FroalaEditor.RegisterCommand('save', {
//       title: 'Сохранить',
//       focus: false,
//       undo: false,
//       refreshAfterCallback: false,
//       callback: () => {
//         /* $('#htmlEditor').froalaEditor('html.set', 'My custom paragraph.'); */
//         let htmlEditorContent = $('#htmlEditor').froalaEditor('html.get');
//         this.entity.Description = htmlEditorContent;
//         this.froalaEditorContent = htmlEditorContent;
//       }
//     });
//   }
//
//   descriptionSelectedTabIndex: number;
//   froalaEditorContent: string;
//
//   descriptionSelectedTabChange(tab)
//   {
//     if (tab.index == 2)
//     {
//       this.froalaEditorContent = this.entity.Description;
//     }
//   }
}
