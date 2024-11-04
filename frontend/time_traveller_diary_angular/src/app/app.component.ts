import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  public isAuthenticated$: Observable<boolean>;
  private subscription: Subscription = new Subscription();
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService) {
      this.isAuthenticated$ = this.auth.isAuthenticated$;
  }


  ngOnInit(): void {
    this.subscription.add(this.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently().subscribe({
          next: (token) => {
            console.log(token);
            localStorage.setItem("auth0", token);
          }
        })
      }      
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  title = 'time_traveller_diary_angular';


  login() {
    this.auth.loginWithRedirect().subscribe();
    // this.auth.handleRedirectCallback().subscribe({
    //   next: () => {
    //     this.auth.getAccessTokenSilently().subscribe((token: string) => {
    //       console.log(token);
    //       localStorage.setItem("auth0", token);
    //     })
    //   },
    //   error: (err) => {
    //     console.error("redirect handling failed")
    //   }
    // })

  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }


}
