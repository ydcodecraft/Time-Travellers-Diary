import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomAuthService {
  // use behavior subject as observable to send signal back to other components
  // header component will be able to track if the current user has successfully authenticated
  // using behavior subject instead of subject because it emits a value on initialization
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      // emit the signal and other components that subscribe to this will receive it  
      this.isLoggedInSubject.next(isAuthenticated);
 
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently().subscribe({
          next: (token) => {
            console.log(token);
            
            //  store the access token to local storage
            localStorage.setItem("auth0", token);
          }
        })
      }
    });
  }

  login() {
    console.log('trying to login');
    this.auth.loginWithRedirect().subscribe(() => {
        this.router.navigate(['/diary-dashboard'])
      });
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }

}
