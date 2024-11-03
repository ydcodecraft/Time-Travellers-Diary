import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { map, Observable, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor( private auth: AuthService, private router: Router) {}

    // if authenticated, nothing happens
    // if not authenticated, redirect user to auth0's login page
    canActivate(): Observable<boolean> {
        return this.auth.isAuthenticated$.pipe(take(1), map(isAuthenticated => {
            if (isAuthenticated) {
                return true;
            }
            else{
                this.auth.loginWithRedirect();
                return false;
            }
        }))
    }

}