import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'isAuthenticated';
  private readonly VALID_EMAIL = 'admin@test.com';
  private readonly VALID_PASSWORD = 'admin123';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  /**
   * Check if user is authenticated by checking localStorage
   */
  private checkAuthStatus(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const authStatus = localStorage.getItem(this.STORAGE_KEY);
    return authStatus === 'true';
  }

  /**
   * Login with credentials
   * @param credentials - User email and password
   * @returns boolean indicating success
   */
  login(credentials: AuthCredentials): boolean {
    if (credentials.email === this.VALID_EMAIL && credentials.password === this.VALID_PASSWORD) {
      if (this.isBrowser) {
        localStorage.setItem(this.STORAGE_KEY, 'true');
      }
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  /**
   * Logout user
   */
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
