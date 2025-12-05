import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = false;

  constructor() {
    this.loadStoredTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  private loadStoredTheme(): void {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      this.isDark = true;
    } else if (stored === 'light') {
      this.isDark = false;
    } else {
      // default to system preference
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }
}
