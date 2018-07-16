import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent extends BaseComponent implements OnInit {

    constructor(
        public notificationService: NotificationService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Category;
    }

  ngOnInit() {
  }

}
