import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmationDialogData } from '../../../models/dialog/confirmation-dialog-data';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
    }

    ngOnInit() {
    }
/*
    ok(): void {
        this.data.result = true;
        this.dialogRef.close();
    }

    cancel(): void {
        this.data.result = false;
        this.dialogRef.close();
    }
*/
}
