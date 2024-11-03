import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  public isAuthenticated$: Observable<boolean>;
  constructor(
      @Inject(DOCUMENT) public document: Document,
      public auth: AuthService) {
        this.isAuthenticated$ = this.auth.isAuthenticated$;
      }

  title = 'time_traveller_diary_angular';
  

  login() {
    this.auth.loginWithRedirect();
  }  

  logout(){
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }

  
}
