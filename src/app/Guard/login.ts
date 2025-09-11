// login.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(): boolean {
        const loggedIn = localStorage.getItem('adminLoggedIn');
        if (loggedIn === 'true') return true;
        alert('請先登入！');
        this.router.navigate(['/home']);
        return false;
    }
}
