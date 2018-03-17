import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Category} from '../../../models/page/category.model';
import {CategoryService} from '../../../services/category.service';
import {BaseComponent} from '../../base.component';
import {NotificationService} from '../../../services/notification.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Photo} from '../../../models/page/photo.model';
import {PhotoService} from '../../../services/photo.service';
import { Page } from "../../../models/page/page.model";
import { ProductService } from "../../../services/product.service";

declare var $ :any;

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.css']
})
export class PageFormComponent extends BaseComponent implements OnInit {

  @Input() child: Page;

  private category_url: string;
  private product_url: string;

  public entity: Category = new Category();

  //submitted = false;
  //onSubmit() { this.submitted = true; }

  constructor(
    private entityService: CategoryService,
    private childService: ProductService,
    private photoService: PhotoService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {
    super();
  }

  ngOnInit()
  {
    this.componentTitle = this.activatedRoute.snapshot.data['title'];

    this.activatedRoute.params.subscribe(params => {
      this.category_url = params['category_url'];
      this.product_url = params['product_url'];

      if (!this.category_url) {
        this.entity = new Category();
      }
      else {
        this.reload(this.category_url)
      }
    });

    this.froalaInit();
  }

  reload(url: string)
  {
    if (!url) return;

    this.notificationService.appLoadingSet(true);
    this.entityService.get(url)
      .then(item => {
        this.entity = (item || new Category());
        this.descriptionSelectedTabIndex = 0;
        this.notificationService.appLoadingSet(false);
        this.reloadPhoto();
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  reloadPhoto()
  {
    if (!this.entity.Photo) return;

    this.notificationService.appLoadingSet(true);
    this.photoService.get(`${this.entity.Photo.Url}.${this.entity.Photo.Type}`)
      .then(item => {
        this.entity.Photo.Base64String = item.Base64String;
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  save()
  {
    if (!this.entity.Url) return;

    this.notificationService.appLoadingSet(true);

    let photoBase64String: string;
    if (this.entity.Photo && this.entity.Photo.Base64String) {
      this.entity.Photo.Url = this.entity.Url;
      photoBase64String = this.entity.Photo.Base64String;
      this.entity.Photo.Base64String = null;
    }

    // если изменился Url, удаляем старую сущность и обновляем ссылки:
    if ((this.category_url != this.entity.Url) && (this.category_url != '')) {
      this.rename(this.category_url, this.entity.Url, this.entity.Url);
    }

    // сохраняем новую сущность:
    this.entityService.post(this.entity)
      .then(item => {
        this.notificationService.categoryChange.emit({Url: this.entity.Url} as Category);
        this.router.navigateByUrl(`/category/${this.entity.Url}`);

        if (this.entity.Photo) {
          this.entity.Photo.Base64String = photoBase64String;
        }

        this.notificationService.appLoadingSet(false);
        //this.reload(this.entity.Url);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  rename(oldUrl: string, oldUrlType: string, newUrl: string)
  {
    this.delete(oldUrl, false, false);

    this.photoService.rename(oldUrl, this.entity.Photo.Type, newUrl);

    // ToDo: переместить все товары из категории oldUrl в категорию newUrl
  }

  delete(url: string, needConfirmation: boolean = true, gotoNewAfterDelete: boolean = true)
  {
    if (needConfirmation
        ? confirm(`Удалить категорию "${this.entity.Title}"?`)
        : true ) {
      this.notificationService.appLoadingSet(true);

      // this.openSnackBar(`Категорию ${this.entity.Title} нельзя удалить, т.к. она содержит товары`, "");

      this.entityService.delete(url)
        .then(item => {
          this.notificationService.categoryChange.emit({Url: this.entity.Url} as Category);
          if (gotoNewAfterDelete) {
            this.router.navigateByUrl("/category");
          }
          this.notificationService.appLoadingSet(false);
        })
        .catch(error => {
          this.handleError(error);
          this.notificationService.appLoadingSet(false);
        });

      this.deletePhoto();
    }

  }

  deletePhoto() {
    if (!this.entity || !this.entity.Photo) return;

    let id = `${this.entity.Url}.${this.entity.Photo.Type}`;

    this.notificationService.appLoadingSet(true);

    this.photoService.delete(id)
      .then(item => {
        this.entity.Photo = new Photo();
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  add()
  {
    this.notificationService.appLoadingSet(true);
    this.router.navigateByUrl("/category");
    this.notificationService.appLoadingSet(false);
  }

  addChild()
  {
    if( !this.child ) return;

    this.notificationService.appLoadingSet(true);
    this.router.navigateByUrl(`/${this.child.Url}/${this.entity.Url}`);
    this.notificationService.appLoadingSet(false);
  }

  onTitleInputEnter(value: string)
  {
    this.entity.Url = this.toUrl(value);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // Froala Init and fix:

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

  descriptionSelectedTabIndex: number;
  froalaEditorContent: string;

  descriptionSelectedTabChange(tab)
  {
    if (tab.index == 2)
    {
      this.froalaEditorContent = this.entity.Description;
    }
  }

}

