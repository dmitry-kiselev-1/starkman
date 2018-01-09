import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Photo} from '../../../models/page/photo.model';
import {PhotoService} from '../../../services/photo.service';
import {BaseComponent} from '../../base.component';
import {NotificationService} from '../../../services/notification.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Page} from '../../../models/page/page.model';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent extends BaseComponent implements OnInit {

  @Input() entity: Photo;
  @Input() isSinglePhoto: boolean;

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService) {
    super();
  }

  ngOnInit()
  {
    this.reload(this.entity.Url)
  }

  reload(url: string)
  {
    if (!url) return;

    this.entity = { Url: "bryuki_zauzhennye", Type: "jpeg" } as Photo;
    return;
    /*
    this.notificationService.appLoadingSet(true);
    this.photoService.get(url)
      .then(item => {
        this.entity = (item || new Photo());
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
      */
  }

  // https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/
  // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsBinaryString
  previewPhoto(files: File[])
  {
    if (!files || !files[0]) return;

    this.notificationService.appLoadingSet(true);

    let file: File = files[0];
    let fileSourceName: string = file.name;
    let fileSize: number = file.size;
    let fileType: string = file.type.split('/')[1];

    this.entity.SourceName = fileSourceName;
    this.entity.Type = fileType;
    this.entity.Size = fileSize;

    var reader = new FileReader();
    reader.onloadend = (() => {
      this.entity.Base64String = reader.result;
      //console.log(reader.result);
      this.notificationService.appLoadingSet(false);
    });

    //reader.readAsDataURL(file);
    reader.readAsBinaryString(file);
  }

}
