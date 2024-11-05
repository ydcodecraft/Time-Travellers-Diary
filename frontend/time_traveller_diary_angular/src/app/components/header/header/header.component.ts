import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  public isAuthenticated: Boolean = false;
  private subscription: Subscription = new Subscription();
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private httpClient: HttpClient) {}


  ngOnInit(): void {
    // listens if user is authenticated, if they are, get access token
    this.subscription.add(this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
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

  login() {
    this.auth.loginWithRedirect().subscribe();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }


}
