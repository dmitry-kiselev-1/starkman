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

  @Input() page: Page;
  @Input() isSinglePhoto: boolean;
  public entity: Photo = new Photo();

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
    //this.reload(this.page.Url)
  }

  reload(url: string)
  {
    if (!url) return;

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
  }

  downloadFile()
  {
    /*
    if (!this.entity.Url) return;

    this.notificationService.appLoadingSet(true);

    this.photoService.post(this.entity)
      .then(item => {
        this.reload(this.entity.Url);
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
    */
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  uploadFile(files)
  {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (!file.type.startsWith('image/')){ continue }

      var img = document.createElement("img");
      img.classList.add("obj");
      img.src = file;
      $("#preview").append(img);

      var reader = new FileReader();
      reader.onload =
      (
        function(aImg)
        {
          return function(e)
          {
            aImg.src = e.target.result;
          };
        }
      )
      (img);

      reader.readAsDataURL(file);
    }

    /*
    if (!this.entity.Url) return;

    this.notificationService.appLoadingSet(true);

    this.photoService.post(this.entity)
      .then(item => {
        this.reload(this.entity.Url);
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
    */
  }

  delete(url: string, needConfirmation: boolean = true) {
    if (needConfirmation
        ? confirm(`Удалить фото "${this.page.Title}"?`)
        : true) {
    /*
        this.notificationService.appLoadingSet(true);

        // this.openSnackBar(`Категорию ${this.entity.Title} нельзя удалить, т.к. она содержит товары`, "");

        this.photoService.delete(url)
          .then(item => {
            this.notificationService.appLoadingSet(false);
          })
          .catch(error => {
            this.handleError(error);
            this.notificationService.appLoadingSet(false);
          });
    */
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
