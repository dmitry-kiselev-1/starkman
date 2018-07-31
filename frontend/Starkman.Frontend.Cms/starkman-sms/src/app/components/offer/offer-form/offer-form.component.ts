import { Component, Input, OnInit } from '@angular/core';
import { Page } from '../../../models/page/page';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';
import { OfferGrid } from '../../../models/order/offer-grid';
import { Offer } from '../../../models/order/offer';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent extends BaseComponent implements OnInit {

    @Input() entity: any; // Page;
    public product_id: string;
    public category_id: string;

    constructor(
        public notificationService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Offer;
    }

    heightCol: Array<number> = new Array<number>();
    sizeCol: Array<number> = new Array<number>();
    offerCol: Array<Offer> = new Array<Offer>();

    ngOnInit() {
        this.create();
        this.activatedRoute.paramMap
            .subscribe(
                (params: ParamMap) => {
                    this.product_id = params.get('product_id');
                    this.category_id = params.get('category_id');
                    this.fillByParent();
                    this.create();
                },
                error => this.handleError(error)
            );
    }

    create() {
        this.heightCol = new Array<number>();
        this.sizeCol = new Array<number>();
        this.offerCol = new Array<Offer>();

        if(!(this.entity as any).offerGrid) return;

        for (let i = 0;
            i < (this.entity as any).offerGrid.height.count;
            i++)
        {
            let height = i * (this.entity as any).offerGrid.height.step +
                (this.entity as any).offerGrid.height.min;

            //console.log(height);
            this.heightCol.push(height);
        }

        for (let i = 0;
             i < (this.entity as any).offerGrid.size.count;
             i++)
        {
            let size = i * (this.entity as any).offerGrid.size.step +
                (this.entity as any).offerGrid.size.min;

            //console.log(size);
            this.sizeCol.push(size);
        }

        this.heightCol.forEach(h =>
            this.sizeCol.forEach(s => {
                    this.offerCol.push({height: h, size: s, price: null} as Offer);
                    //console.log(`height ${h}: size ${s}`);
                }
            ));
    }

    onGridChange()
    {
        this.create();
    }

    fillByParent() {
        debugger;
        if(!(this.entity as any).urlParent) return;
        let parentOfferGrid = (this.entity as any).parent.offerGrid || null;

        if(this.entity.offerGrid == {height: {min:null, step:null, count:null}, size: {min:null, step:null, count:null}} as OfferGrid) {
            debugger;
            this.entity.offerGrid = Object.assign(this.entity.offerGrid, this.entity.parent.offerGrid);
        }
    }
}
