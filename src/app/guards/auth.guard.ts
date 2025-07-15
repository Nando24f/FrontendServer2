import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdminLoggedIn = localStorage.getItem('adminAutenticado') === 'true';

    if (isAdminLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login-admin']);
      return false;
    }
  }
}
