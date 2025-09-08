import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ApiService } from '../@services/api.service';
import {  MatNativeDateModule} from '@angular/material/core';


@Component({
  selector: 'app-dialog-parking-find',
  standalone: true,   // <-- 這裡必須是 standalone
  imports: [
    MatNativeDateModule,  // <- 加上這個
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    
    
  ],

  templateUrl: './dialog-parking-find.component.html',
  styleUrls: ['./dialog-parking-find.component.scss']
})
export class DialogParkingFindComponent {
  phone: string = '';
  reservationData: any = null;
  editMode: boolean = false;
  form: FormGroup;
  minDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<DialogParkingFindComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parkService: ApiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      carNumber: [''],
      date: ['', Validators.required],
      time: ['', [Validators.required]],
      name: [''],
      remark: ['']
    });
  }

  // 切換編輯模式
  enableEdit() {
    this.editMode = true;
    if (this.reservationData) {
      this.form.patchValue(this.reservationData);
    }
  }


  
  // 儲存更新
  saveUpdate() {
    const updatedData = { ...this.reservationData, ...this.form.value };
     let payload = { ...this.form.value };

 // 轉成 yyyy-MM-dd 字串，避免時區問題
  if (payload.date instanceof Date) {
      const d = payload.date;
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      payload.date = `${yyyy}-${mm}-${dd}`;
    }
    updatedData.date = payload.date;
    this.parkService.update(updatedData).subscribe({
      next: (res) => {
        if (res.code === 200) {
          alert('更新成功');
          this.editMode = false;
          this.reservationData = updatedData;
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('更新失敗');
      }
    });
  }

  // 查詢資料
  findReservation() {
    if (!this.phone) {
      alert('請輸入電話查詢');
      return;
    }

    this.parkService.getInfo(this.phone.trim()).subscribe({
      next: (res: any) => {
        console.log('API 回傳', res);
        if (res.code === 200) {
          this.reservationData = res;
          this.editMode = false;
        } else {
          alert(res.message);
          window.location.reload(); // 查詢失敗刷新頁面
        }
      },
      error: (err) => {
        console.error(err);
        alert('查詢失敗');
        window.location.reload(); // API 發生錯誤刷新頁面
      }
    });
  }

  del() {
    if (!this.phone) return;

    this.parkService.delete(this.phone.trim()).subscribe({
      next: (res) => {
        console.log('API 回傳', res);
        if (res.code === 200) {
          alert('刪除成功');
        } else {
          alert(res.message || '刪除失敗');
        }
        this.reservationData = null;
        this.phone = '';
      },
      error: (err) => {
        console.error(err);
        alert('刪除失敗');
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // 可加一個時間格式限制
  formatTime(event: any) {
  let value: string = event.target.value;
  // 移除所有非數字
  value = value.replace(/\D/g, '');
  if (value.length >= 3) {
    // 自動加冒號，例如 1230 -> 12:30
    value = value.slice(0, 2) + ':' + value.slice(2, 4);
  }
  // 限制長度 5 字元 (HH:mm)
  if (value.length > 5) value = value.slice(0, 5);
  event.target.value = value;
  this.form.get('time')?.setValue(value, { emitEvent: false });
}
}
