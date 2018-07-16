import { Component, Input, OnInit } from '@angular/core';
import { Page } from '../../../models/page/page';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent extends BaseComponent implements OnInit {

    @Input() entity: Page;

    constructor(
        private notificationService: NotificationService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Filter;
    }

    ngOnInit() {}
}
