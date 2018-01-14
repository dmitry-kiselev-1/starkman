import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Photo} from '../../../models/page/photo.model';
import {PhotoService} from '../../../services/photo.service';
import {BaseComponent} from '../../base.component';
import {NotificationService} from '../../../services/notification.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Category} from '../../../models/page/category.model';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent extends BaseComponent implements OnInit {

  private query_url: string;
  @Input() entity: Category;
  @Input() isSinglePhoto: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private photoService: PhotoService,
    private snackBar: MatSnackBar) {
    super();
  }

  ngOnInit() {}

  // https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/
  // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsBinaryString
  previewPhoto(files: File[])
  {
    if (!files || !files[0]) return;

    this.entity.Photo = new Photo();
    this.entity.Photo.Url = this.entity.Url;

    this.notificationService.appLoadingSet(true);

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
      this.savePhoto(this.entity.Photo);
      this.notificationService.appLoadingSet(false);
    });

    reader.readAsDataURL(file);
    //reader.readAsBinaryString(file);
  }

  savePhoto(photo: Photo) {

    this.notificationService.appLoadingSet(true);

    this.photoService.post(photo)
      .then(result => {
        this.notificationService.appLoadingSet(false);
        if (result) { this.snackBar.open('Фото сохранено', "ok") };
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  /*
  random: string;
  ngAfterContentChecked() {
    this.random = '?nocache=' + Math.floor(Math.random() * 1000).toString();
  }
  */
}
