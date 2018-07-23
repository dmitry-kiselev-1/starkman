import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoginDialogData } from '../../../models/dialog/login-dialog-data';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: LoginDialogData) {
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
