// fillin.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class Fill implements CanActivate {
    constructor(private router: Router) { }
    canActivate(): boolean {
        const canFill = sessionStorage.getItem('canFillQuiz');
        if (canFill === 'true') return true;
        alert('你無權限直接進入此頁面');
        this.router.navigate(['/home']);
        return false;
    }
}
