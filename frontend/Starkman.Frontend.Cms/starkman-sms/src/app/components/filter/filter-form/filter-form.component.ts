import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Page } from '../../../models/page/page';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';
import { Filter } from '../../../models/page/filter';
import { FilterService } from '../../../services/filter.service';
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import * as _lodash from 'lodash';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../../../models/dialog/confirmation-dialog-data';
import { Product } from '../../../models/page/product';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent extends BaseComponent implements OnInit {

    @Input() entity: Product;
    allFiltersColumns: string[] = ['sortOrder', 'name', 'select'];
    selectedFiltersColumns: string[] = ['name', 'value'];

    allFiltersSelection: any;
    selectedFiltersSelection: any;

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
        const initialSelection = [];
        const allowMultiSelect = true;
        this.allFiltersSelection = new SelectionModel<Filter>(allowMultiSelect, initialSelection);
        this.selectedFiltersSelection = new SelectionModel<Filter>(allowMultiSelect, initialSelection);
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

    applyFilter(filterValue: string)
    {
        this.allFiltersDataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteSelectedFilters()
    {

    }

    addFiltersCol()
    {
        this.allFiltersDataSource.data.push({id: this.guid(), sortOrder: 0, name: 'Новый фильтр', value: ''} as Filter)
        this.allFiltersDataSource.data = _lodash.sortBy(this.allFiltersDataSource.data, (f) => (f as Filter).sortOrder);
    }

    saveFiltersCol()
    {

    }

    deleteFiltersCol()
    {

    }

    filtersColDeleteConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: this.confirmationDialogData,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog result: ${(result as ConfirmationDialogData).result}`);
            if ((result as ConfirmationDialogData).result == true)
                this.deleteFiltersCol();
        });
    }

    /** Whether the number of selected elements matches the total number of rows. */
    allFiltersIsAllSelected() {
        const numSelected = this.selectedFiltersSelection.selected.length;
        const numRows = this.allFiltersDataSource.data.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    allFiltersMasterToggle() {
        this.allFiltersIsAllSelected() ?
            this.selectedFiltersSelection.clear() :
            this.entity.filterList.forEach(row => this.selectedFiltersSelection.select(row));
    }

    // /** Whether the number of selected elements matches the total number of rows. */
    // selectedFiltersColumnsIsAllSelected() {
    //     const numSelected = this.allFiltersSelection.selected.length;
    //     const numRows = this.entity.filterList.length;
    //     return numSelected == numRows;
    // }
    //
    // /** Selects all rows if they are not all selected; otherwise clear selection. */
    // selectedFiltersColumnsMasterToggle() {
    //     this.selectedFiltersColumnsIsAllSelected() ?
    //         this.allFiltersSelection.clear() :
    //         this.entity.filterList.forEach(row => this.allFiltersSelection.select(row));
    // }

}
