import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  public isAuthenticated$: Observable<boolean>;
  private subscription: Subscription = new Subscription();
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private httpClient: HttpClient) {
      this.isAuthenticated$ = this.auth.isAuthenticated$;
  }


  ngOnInit(): void {
    // listens if user is authenticated, if they are, get access token
    this.subscription.add(this.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently().subscribe({
          next: (token) => {
            console.log(token);
            //  store the access token to local storage
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
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }


  authorized_heart_beat_test() {
    this.httpClient.get(
      encodeURI(`http://127.0.0.1:8000/authorized_heart_beat_test`)
    ).subscribe();
  }
}
