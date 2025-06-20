import { CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    // If not in browser, block access (prevents SSR/hydration from showing dashboard)
    return false;
  }
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
  return true;
};
