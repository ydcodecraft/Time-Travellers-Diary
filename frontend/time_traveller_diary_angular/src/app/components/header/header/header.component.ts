import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CustomAuthService } from '../../../services/customAuth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription;
  public isLoggedIn: Boolean = false;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private customAuth: CustomAuthService,
    private httpClient: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(this.customAuth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  login(): void {
    this.customAuth.login();
  }

  logout(): void {
    this.customAuth.logout();
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }

  redirectToDashboard(): void {
    this.router.navigate(['/diary-dashboard']);
  }
}
