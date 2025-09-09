import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class Fillin implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        const canFill = sessionStorage.getItem('canFillQuiz'); // 按按鈕時設置
        if (canFill === 'true') {
            return true;
        } else {
            alert('你無權限直接進入此頁面');
            this.router.navigate(['/home']);
            return false;
        }
    }
}
