import { Injectable }     from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

// https://angular.io/guide/router#activated-route-in-action
@Injectable()
export class AuthGuardService implements CanActivateChild {
    canActivateChild() {
        console.log('AuthGuardService CanActivateChild');
        return true;
    }
}
