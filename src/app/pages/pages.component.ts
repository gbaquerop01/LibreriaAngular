import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { filter } from 'rxjs';

@Component({
  selector: 'app-pages',
  standalone: false,
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  isLoggedIn = false;
  loggedInUser: string | null = '';
  isLoginOrRegisterPage = false;
  displaySidebar = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loggedInUser = this.authService.getLoggedInUser();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.isLoginOrRegisterPage = this.router.url.includes('login') || this.router.url.includes('register');
    });

    console.log("Current User: ", this.loggedInUser);
  }

  goToLogin(): void {
    this.authService.logout();
    this.router.navigate(['/main/login']);
  }

  goToMainPage(): void {
    this.router.navigate(['/main']);
  }

  goToUserInfoPage() {
    this.router.navigate(['/user-info']);
  }

  openCarrito() {
    this.router.navigate(['/main/carrito']);
  }

  toggleSidebar() {
    this.displaySidebar = !this.displaySidebar;
  }
}
