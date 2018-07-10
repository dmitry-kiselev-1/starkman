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
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
    }

    ngOnInit() {}
}
  // // https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/
  // // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsBinaryString
  // previewPhoto(files: File[])
  // {
  //   if (!files || !files[0]) return;
  //
  //   this.entity.photo = {} as Photo;
  //   this.entity.photo.url = this.entity.url;
  //
  //   this.notificationService.appLoading = true;
  //
  //   let file: File = files[0];
  //   let fileSourceName: string = file.name;
  //   let fileSize: number = file.size;
  //   let fileType: string = file.type.split('/')[1];
  //
  //   this.entity.photo.type = fileType;
  //   this.entity.photo.size = fileSize;
  //
  //   var reader = new FileReader();
  //   reader.onloadend = (() => {
  //     this.entity.photo.base64String = reader.result;
  //     //this.entity.BinaryString = reader.result;
  //     //console.log(reader.result);
  //     this.uploadPhoto(this.entity.photo);
  //     this.notificationService.appLoading = false;
  //   });
  //
  //   reader.readAsDataURL(file);
  //   //reader.readAsBinaryString(file);
  // }
  //
  // uploadPhoto(photo: Photo) {
  //
  //   this.notificationService.appLoading = true;
  //
  //   this.photoService.post(photo)
  //     .then(result => {
  //       this.notificationService.appLoading = false;
  //       //if (result) { this.snackBar.open('Фото успешно загружено') };
  //     })
  //     .catch(error => {
  //       this.handleError(error);
  //       this.notificationService.appLoading = false;
  //     });
  // }
  //
  // downloadPhoto()
  // {}
  //
  // deletePhoto(needConfirmation: boolean = true)
  // {
  //   if (!this.entity || !this.entity.photo) return;
  //
  //   let id = `${this.entity.url}.${this.entity.photo.type}`;
  //
  //   if (needConfirmation
  //       ? confirm(`Удалить фото ${id}?`)
  //       : true ) {
  //
  //     this.notificationService.appLoading = true;
  //
  //     this.photoService.delete(id)
  //       .then(item => {
  //         this.entity.photo = {} as Photo;
  //         this.notificationService.appLoading = false;
  //       })
  //       .catch(error => {
  //         this.handleError(error);
  //         this.notificationService.appLoading = false;
  //       });
  //   }
  //
  // }
  //
  // /*
  // random: string;
  // ngAfterContentChecked() {
  //   this.random = '?nocache=' + Math.floor(Math.random() * 1000).toString();
  // }
  // */

