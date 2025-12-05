import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AuthCredentials } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  credentials: AuthCredentials = {
    email: '',
    password: '',
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Redirect if already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/board']);
    }
  }

  /**
   * Handle login form submission
   */
  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;

    // Simple validation
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Please enter both email and password';
      this.isLoading = false;
      return;
    }

    // Simulate async login
    setTimeout(() => {
      const success = this.authService.login(this.credentials);

      if (success) {
        this.router.navigate(['/board']);
      } else {
        this.errorMessage = 'Invalid email or password';
        this.isLoading = false;
      }
    }, 500);
  }

  /**
   * Fill demo credentials
   */
  fillDemoCredentials(): void {
    this.credentials.email = 'admin@test.com';
    this.credentials.password = 'admin123';
  }
}
