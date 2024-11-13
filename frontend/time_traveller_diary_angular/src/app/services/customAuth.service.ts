import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TimeTravellerService } from '@ydcodecraft/time_travellers_diary_api';
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
    private router: Router,
    private timeTravellerService: TimeTravellerService
  ) {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      // emit the signal and other components that subscribe to this will receive it  
      this.isLoggedInSubject.next(isAuthenticated);
 
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently().subscribe({
          next: (token) => {            
            //  store the access token to local storage
            // localStorage.setItem("auth0", token);
          }
        })

     
        this.auth.user$.subscribe((result) => {
          let snaitized_sub = result?.sub?.replace('|','.');
          if (snaitized_sub !== null && snaitized_sub !== undefined) {
            this.timeTravellerService.timeTravellerCheckRetrieve(snaitized_sub).subscribe({
              // didn't find any time traveller, redirect to time traveller creaton screen
              error: (err) => {
                if(err.status === 404) {
                  this.router.navigate(['/time-traveller-creation']);
                }
                else {
                  
                  console.error(err);
                }
              }
            })
          }
        })
        // this.timeTravellerService.timeTravellerCheckRetrieve()
      
      }
    });
  }

  login() {
    console.log('trying to login');
    this.auth.loginWithRedirect().subscribe(() => {
        // this.router.navigate(['/diary-dashboard'])
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }

}
