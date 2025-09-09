import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../@services/api.service';


@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule,],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent {
  user: string = '';
  password: string = '';


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private apiService: ApiService,
  ) { }

  // 關閉對話框返回數據
  login(): void {
    if (!this.user || !this.password) {
      alert('請輸入帳號和密碼');
      return;
    }

    const loginData = {
      account: this.user,
      password: this.password,
    };

    this.apiService.login(loginData).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          // 登入成功
          localStorage.setItem('adminLoggedIn', 'true');
          this.dialogRef.close({ success: true });
          this.router.navigate(['/childb']); // 管理頁
        } else {
          alert(res.message || '登入失敗');
        }
      },
      error: (err) => {
        console.error(err);
        alert('登入 API 發生錯誤');
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
