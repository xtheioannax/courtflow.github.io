import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor() {
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  loadStoredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) {
      this.isDark = stored === 'dark';
      this.applyTheme();
    }
  }
}
