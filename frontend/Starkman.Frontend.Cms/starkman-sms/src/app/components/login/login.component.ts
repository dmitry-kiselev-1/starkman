import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { BaseComponent } from '../base.component';
import { PageType } from '../../models/page/page-type';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginDialogComponent } from '../dialog/login-dialog/login-dialog.component';
import { LoginDialogData } from '../../models/dialog/login-dialog-data';
import { User } from '../../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
    message: string;

    isSuccess: boolean = false;

    constructor(
        public authService: AuthService,
        public router: Router,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Product;
    }

    ngOnInit(): void {
        if (this.authService.loginProtection && !this.authService.isLoggedIn)
            this.loginDialog();
    }

    login(user: User) {
        console.log(`Trying to login...`);

        this.authService.login(user).subscribe(() => {
            //this.setMessage();
            if (this.authService.isLoggedIn) {
                console.log(`Login success!`);
                this.isSuccess = true;

                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

                // Redirect the user
                this.router.navigate([redirect]);
            }
            else
            {
                console.log(`Login falure!`);
                this.isSuccess = false;
                this.loginDialog();
            }
        });
    }

    logout() {
        this.authService.logout();
        console.log(`logout`);
    }

    loginDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            data: this.loginDialogData,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog result: ${JSON.stringify(result)}`);
            //if ((result as LoginDialogData).result == true)
            this.login((result as LoginDialogData).data);
        });
    }

}
