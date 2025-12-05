import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly ADMIN_EMAIL = 'admin@test.com';
    private readonly ADMIN_PASS = 'admin123';
    private readonly IS_LOGGED_IN_KEY = 'is_logged_in';

    isLoggedIn = signal<boolean>(false);

    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isLoggedIn.set(this.checkLoginStatus());
    }

    login(email: string, pass: string): boolean {
        if (email === this.ADMIN_EMAIL && pass === this.ADMIN_PASS) {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem(this.IS_LOGGED_IN_KEY, 'true');
            }
            this.isLoggedIn.set(true);
            return true;
        }
        return false;
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(this.IS_LOGGED_IN_KEY);
        }
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }

    private checkLoginStatus(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.IS_LOGGED_IN_KEY) === 'true';
        }
        return false;
    }
}
