import { Component, Input, OnInit } from '@angular/core';
import { Page } from '../../../models/page/page';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';
import { OfferGrid } from '../../../models/order/offer-grid';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent extends BaseComponent implements OnInit {

    @Input() entity: Page;

    constructor(
        private notificationService: NotificationService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Offer;
    }

    offerGridArray: Array<number> = new Array<number>();

    ngOnInit() {
        this.create();
    }

    create() {
        if(!(this.entity as any).offerGrid) return;

        for (let i = 0;
            i < (this.entity as any).offerGrid.height.count;
            i++)
        {
            let height = i * (this.entity as any).offerGrid.height.step +
                (this.entity as any).offerGrid.height.min;

            console.log(height);
        }
    }

}
