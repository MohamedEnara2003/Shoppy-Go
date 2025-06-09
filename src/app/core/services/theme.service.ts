import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { lightTheme } from '../theme/theme.config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject(lightTheme);
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(lightTheme);
  }

  private applyTheme(theme: any) {
    const root = document.documentElement;
    
    // Apply color palette
    Object.keys(theme.color).forEach(colorType => {
      if (typeof theme.color[colorType] === 'object') {
        Object.keys(theme.color[colorType]).forEach(variant => {
          const value = theme.color[colorType][variant];
          root.style.setProperty(`--${colorType}-${variant}`, value);
        });
      }
    });

    // Apply typography
    Object.keys(theme.typography).forEach(prop => {
      root.style.setProperty(`--typography-${prop}`, theme.typography[prop]);
    });

    // Apply shape
    Object.keys(theme.shape).forEach(prop => {
      root.style.setProperty(`--shape-${prop}`, theme.shape[prop]);
    });
  }
} 