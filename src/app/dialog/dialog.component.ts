import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatDialogModule   } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule ,MatFormFieldModule,MatInputModule,FormsModule,],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent {
  user: string = '';
  password: string = '';

  correctUser = '123';
  correctPassword = '123';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  // 關閉對話框返回數據
  login(): void {
    if (this.user === this.correctUser && this.password === this.correctPassword) {
      this.dialogRef.close({ user: this.user, password: this.password });
      this.router.navigate(['/childb']);
    } else {
      console.log('用户名或密码错误');
      alert('用户名或密码错误');
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
