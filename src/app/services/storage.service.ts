import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly STORAGE_KEY = 'jira_board_data';

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    saveData(data: any): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        }
    }

    getData(): any {
        if (isPlatformBrowser(this.platformId)) {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        }
        return null;
    }

    clearData(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }
}
