import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Page } from '../../../models/page/page';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';
import { Filter } from '../../../models/page/filter';
import { FilterService } from '../../../services/filter.service';
import { Order } from '../../../models/order/order';
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import * as _lodash from 'lodash';
import { Offer } from '../../../models/order/offer';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent extends BaseComponent implements OnInit {

    @Input() entity: Page;
    allFiltersColumns: string[] = ['sortOrder', 'name'];
    selectedFiltersColumns: string[] = ['sortOrder', 'name', 'value'];

    allFiltersDataSource = new MatTableDataSource<Filter>([]);
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private notificationService: NotificationService,
        private filterService: FilterService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Filter;
    }

    @Input() set active(active: boolean) {
        //debugger;
        if (active) this.reload();
        console.log("filterTabActive");
    }

    ngOnInit() {
    }

    reload() {
        //this.notificationService.appLoading = true;
        this.filterService.getList()
            .pipe(finalize(() => {
                //this.notificationService.appLoading = false;
            }))
            .subscribe(
                data => {
                    if (data) {
                        data = _lodash.sortBy(data, (f) => (f as Filter).sortOrder);
                        this.allFiltersDataSource.data = data;
                    }
                    else {
                        this.allFiltersDataSource.data = [] as Filter[]
                    }
                    this.allFiltersDataSource.sort = this.sort;
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе списка фильтров!',
                    logMessage: `filterService.getLis()`,
                    error
                } as AppError)
            );
    }

    public applyFilter(filterValue: string)
    {
        this.allFiltersDataSource.filter = filterValue.trim().toLowerCase();
    }

}
