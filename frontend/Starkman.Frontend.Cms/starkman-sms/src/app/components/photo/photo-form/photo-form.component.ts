import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Photo} from '../../../models/page/photo';
import {PhotoService} from '../../../services/photo.service';
import {BaseComponent} from '../../base.component';
import {NotificationService} from '../../../services/notification.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Category} from '../../../models/page/category';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent extends BaseComponent implements OnInit {

  private query_url: string;
  @Input() entity: Category;
  @Input() isSinglePhoto: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private photoService: PhotoService,
    protected snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit() {}

  // https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/
  // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsBinaryString
  previewPhoto(files: File[])
  {
    if (!files || !files[0]) return;

    this.entity.Photo = new Photo();
    this.entity.Photo.url = this.entity.url;

    this.notificationService.appLoading = true;

    let file: File = files[0];
    let fileSourceName: string = file.name;
    let fileSize: number = file.size;
    let fileType: string = file.type.split('/')[1];

    this.entity.Photo.Type = fileType;
    this.entity.Photo.Size = fileSize;

    var reader = new FileReader();
    reader.onloadend = (() => {
      this.entity.Photo.Base64String = reader.result;
      //this.entity.BinaryString = reader.result;
      //console.log(reader.result);
      this.uploadPhoto(this.entity.Photo);
      this.notificationService.appLoading = false;
    });

    reader.readAsDataURL(file);
    //reader.readAsBinaryString(file);
  }

  uploadPhoto(photo: Photo) {

    this.notificationService.appLoading = true;

    this.photoService.post(photo)
      .then(result => {
        this.notificationService.appLoading = false;
        //if (result) { this.snackBar.open('Фото успешно загружено') };
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoading = false;
      });
  }

  downloadPhoto()
  {}

  deletePhoto(needConfirmation: boolean = true)
  {
    if (!this.entity || !this.entity.Photo) return;

    let id = `${this.entity.url}.${this.entity.Photo.Type}`;

    if (needConfirmation
        ? confirm(`Удалить фото ${id}?`)
        : true ) {

      this.notificationService.appLoading = true;

      this.photoService.delete(id)
        .then(item => {
          this.entity.Photo = new Photo();
          this.notificationService.appLoading = false;
        })
        .catch(error => {
          this.handleError(error);
          this.notificationService.appLoading = false;
        });
    }

  }

  /*
  random: string;
  ngAfterContentChecked() {
    this.random = '?nocache=' + Math.floor(Math.random() * 1000).toString();
  }
  */
}
