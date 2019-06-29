import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable()
export class AuthService {

    loginProtection: boolean = false;
    isLoggedIn: boolean = !this.loginProtection;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(user: User): Observable<boolean> {
        //debugger;
        //ToDo: login storage request:
        let loginDataIsCorrect: boolean = ((user.login == "0") && (user.password == "0"));
        this.isLoggedIn = loginDataIsCorrect;

        return of((this.isLoggedIn)).pipe(
            delay(0),
            //tap(val => this.isLoggedIn = (user.login == "0"))
            //tap(val => console.log(`Dialog result: ${JSON.stringify(this.isLoggedIn)}`))
        );
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
