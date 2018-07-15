import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppError } from '../models/app-error';
import { PageType } from '../models/page/page-type';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../models/dialog/confirmation-dialog-data';
import * as _moment from 'moment';
import * as _lodash from 'lodash';

export abstract class BaseComponent {

    componentTitle: string;
    entityType: PageType;

    constructor(protected snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    protected handleError(error: AppError) {
        const defaultMessage = 'При выполнении операции произошла ошибка.';
        const repeatMessage = 'Пожалуйста, повторите операцию позже.';

        console.error(error.logMessage);
        this.snackBar.open((error.userMessage || defaultMessage) + ' ' + repeatMessage, 'ОК');
    }

    protected showInfo(message: string): void {
        this.snackBar.open(message, null, {duration: 3000});
    }

    private space = '_';
    private empty = 'y';
    private a = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
        'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ы': 'y', 'ь': this.empty, 'ъ': this.empty,
        'э': 'e', 'ю': 'yu', 'я': 'ya',
        ' ': this.space, '_': this.space, '`': this.space, '~': this.space, '!': this.space, '@': this.space,
        '#': this.space, '$': this.space, '%': this.space, '^': this.space, '&': this.space, '*': this.space,
        '(': this.space, ')': this.space, '-': this.space, '\=': this.space, '+': this.space, '[': this.space,
        ']': this.space, '\\': this.space, '|': this.space, '/': this.space, '.': this.space, ',': this.space,
        '{': this.space, '}': this.space, '\'': this.space, '"': this.space, ';': this.space, ':': this.space,
        '?': this.space, '<': this.space, '>': this.space, '№': this.space
    };

    protected toUrl(title) {
        return title
            ? (title.toLowerCase().split('').map((char) => {
                return this.a[char] || char;
            }).join(''))
            : '';
    }

    public confirmationDialogData: ConfirmationDialogData = {result: false} as ConfirmationDialogData;
    /*
    public confirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: this.confirmationDialogData,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${(result as ConfirmationDialogData).result}`);
            this.confirmationDialogData = result;
        });
    }
    */
}
