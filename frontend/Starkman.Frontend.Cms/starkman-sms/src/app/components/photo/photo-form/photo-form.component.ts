import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Photo} from '../../../models/page/photo';
import {PhotoService} from '../../../services/photo.service';
import {BaseComponent} from '../../base.component';
import {NotificationService} from '../../../services/notification.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import { Page } from '../../../models/page/page';
import { PageType } from '../../../models/page/page-type';
import * as _lodash from 'lodash';
import { ConfirmationDialogData } from '../../../models/dialog/confirmation-dialog-data';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent extends BaseComponent implements OnInit {

    @Input() entity: Page;
    @Input() selectedPhoto;

    constructor(
        private notificationService: NotificationService,
        private photoService: PhotoService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Photo;
    }

    ngOnInit() {
    }

    onTitleInputEnter(value: string) {
        if (!this.selectedPhoto || !this.entity) return;
        this.selectedPhoto.url = `${this.entity.url}_${this.toUrl(value)}`;
    }

    photoSelect(photo: Photo)
    {
        this.selectedPhoto = photo;
    }

    delete()
    {
        this.entity.photoList = _lodash.filter(this.entity.photoList, (photo) => photo.id != this.selectedPhoto.id);
        this.selectedPhoto = null;
    }

    deleteConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: this.confirmationDialogData,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog result: ${(result as ConfirmationDialogData).result}`);
            if ((result as ConfirmationDialogData).result == true)
                this.delete();
        });
    }

    // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsBinaryString
    previewPhoto(files: File[]) {
        if (!files || !files[0]) return;

        this.notificationService.appLoading = true;

        let newPhoto = {} as Photo;

        let sortOrder = (this.entity.photoList.length + 1);

        let file: File = files[0];
        let fileSourceName: string = file.name;
        let fileSize: number = file.size;
        let fileType: string = file.type.split('/')[1];

        newPhoto.url = `${this.entity.url}_${sortOrder}`;
        newPhoto.id = newPhoto.url;
        newPhoto.title = sortOrder.toString();
        newPhoto.sortOrder =sortOrder;
        newPhoto.size = fileSize;
        newPhoto.type = fileType;
        newPhoto.isVisible = true;

        var reader = new FileReader();
        reader.onloadend = (() => {
            newPhoto.base64String = reader.result;
            //newPhoto.BinaryString = reader.result;
            this.entity.photoList.push(newPhoto);
            this.selectedPhoto = newPhoto;
            this.notificationService.appLoading = false;
        });

        reader.readAsDataURL(file);
        //reader.readAsBinaryString(file);
    }

    /*
    uploadPhoto(photo: Photo) {
      this.notificationService.appLoading = true;
      this.photoService.post(photo)
        .then(result => {
          this.notificationService.appLoading = false;
        })
        .catch(error => {
          this.handleError(error);
          this.notificationService.appLoading = false;
        });
    }
    */
}
