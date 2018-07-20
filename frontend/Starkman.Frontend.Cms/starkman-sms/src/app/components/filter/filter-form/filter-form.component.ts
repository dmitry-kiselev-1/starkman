import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';
import { Filter } from '../../../models/page/filter';
import { FilterService } from '../../../services/filter.service';
import { concatMap, finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../../../models/dialog/confirmation-dialog-data';
import { Product } from '../../../models/page/product';
import { SelectionModel } from '@angular/cdk/collections';
import * as _lodash from 'lodash';

@Component({
    selector: 'app-filter-form',
    templateUrl: './filter-form.component.html',
    styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent extends BaseComponent implements OnInit {

    @Input() entity: Product;
    allFiltersColumns: string[] = ['sortOrder', 'name', 'select'];
    takenFiltersColumns: string[] = ['name', 'value', 'select'];

    allFiltersSelection: any;
    takenFiltersSelection: any;

    allFiltersDataSource = new MatTableDataSource<Filter>([]);
    takenFiltersDataSource = new MatTableDataSource<Filter>([]);

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
        console.log('filterTabActive');
    }

    ngOnInit() {
        const initialSelection = [];
        const allowMultiSelect = true;
        this.allFiltersSelection = new SelectionModel<Filter>(allowMultiSelect, initialSelection);
        this.takenFiltersSelection = new SelectionModel<Filter>(allowMultiSelect, initialSelection);
    }

    reload(notify: boolean = false) {
        if (notify) {this.notificationService.appLoading = true};
        this.filterService.getList()
            .pipe(finalize(() => { if (notify) { this.notificationService.appLoading = false; }}))
            .subscribe(
                data => {
                    //debugger;
                    if (data) {
                        data = _lodash.sortBy(data, (f) => (f as Filter).sortOrder);
                        this.allFiltersDataSource.data = data;

                        // join for update names:
                        this.entity.filterList = _.map(this.entity.filterList, (filter) =>
                        {
                            let findFilter = _lodash.find(data, (f) => (f as Filter).id == filter.id);
                            if (findFilter)
                            return {
                                id: filter.id,
                                name: _lodash.find(data, (f) => (f as Filter).id == filter.id).name,
                                value: filter.value,
                                sortOrder: filter.sortOrder
                            }
                            else return {id: "-1"};
                        }) as Filter[];

                        this.entity.filterList = _lodash.filter(this.entity.filterList, (filter) => filter.id != "-1");

                        this.takenFiltersDataSource.data = this.entity.filterList;
                    }
                    else {
                        this.allFiltersDataSource.data = [] as Filter[];
                        this.entity.filterList = [] as Filter[];
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

    applyFilter(filterValue: string) {
        this.allFiltersDataSource.filter = filterValue.trim().toLowerCase();
    }

    addFiltersCol(notify: boolean = true) {
        if (notify) {this.notificationService.appLoading = true};
        this.allFiltersDataSource.data.push({id: this.guid(), sortOrder: 0, name: 'Новый фильтр', value: ''} as Filter);
        this.allFiltersDataSource.data = _lodash.sortBy(this.allFiltersDataSource.data, (f) => (f as Filter).sortOrder);
        if (notify) {this.notificationService.appLoading = false};
    }

    saveFiltersCol(notify: boolean = true) {
        if (notify) {this.notificationService.appLoading = true};
        this.allFiltersSelection.clear();
        this.allFiltersDataSource.filter = null;
        this.filterService.replace(this.allFiltersDataSource.data)
            .pipe(finalize(() => { if (notify) { this.notificationService.appLoading = false; }}))
            .subscribe(
                data => {
                    // console.log(`${this.allFiltersDataSource.data.length} filters replaced`);
                    this.reload();
                },
                error => this.handleError({
                    userMessage: 'Ошибка при добавлении фильтра в коллекцию!',
                    logMessage: `filterService.replace.(${this.allFiltersDataSource.data.length})`,
                    error
                } as AppError)
            );
    }

    deleteFiltersCol() {
        this.allFiltersDataSource.data = _lodash.filter(this.allFiltersDataSource.data,
            (filter) => !this.allFiltersSelection.selected.includes(filter)
        );
        this.allFiltersSelection.clear();
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
        const numSelected = this.allFiltersSelection.selected.length;
        const numRows = this.allFiltersDataSource.data.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    allFiltersMasterToggle() {
        this.allFiltersIsAllSelected() ?
            this.allFiltersSelection.clear() :
            this.allFiltersDataSource.data.forEach(row => this.allFiltersSelection.select(row));
    }

    /** Whether the number of selected elements matches the total number of rows. */
    takenFiltersIsAllSelected() {
        const numSelected = this.takenFiltersSelection.selected.length;
        const numRows = this.takenFiltersDataSource.data.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    takenFiltersMasterToggle() {
        this.takenFiltersIsAllSelected() ?
            this.takenFiltersSelection.clear() :
            this.takenFiltersDataSource.data.forEach(row => this.takenFiltersSelection.select(row));
    }

    takeFilter() {
        this.takenFiltersDataSource.data = _lodash.concat(this.takenFiltersDataSource.data, this.allFiltersSelection.selected);

        this.entity.filterList = this.takenFiltersDataSource.data;
    }

    dropFilter() {
        this.takenFiltersDataSource.data = _lodash.filter(this.takenFiltersDataSource.data,
            (filter) => !this.takenFiltersSelection.selected.includes(filter)
        );
        this.takenFiltersSelection.clear();

        this.entity.filterList = this.takenFiltersDataSource.data;
    }
}
