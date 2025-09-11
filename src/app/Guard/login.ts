import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        const loggedIn = localStorage.getItem('adminLoggedIn'); // 依你的登入判斷
        if (loggedIn === 'true') {
            return true;
        } else {
            alert('請先登入！');
            this.router.navigate(['/home']); // 未登入導回首頁
            return false;
        }
    }
}
