import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../@services/api.service'; // 改成你的 Service 路徑
import { MatDialog } from '@angular/material/dialog';
import { DialogParkingFindComponent } from '../dialog-parking-find/dialog-parking-find.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {  MatNativeDateModule} from '@angular/material/core';
@Component({
  selector: 'app-parking',
  providers: [provideNativeDateAdapter()],
  imports: [
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
    MatNativeDateModule,  // <- 這裡也要加
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})

export class ParkingComponent implements OnInit{
   minDate!: Date;
   form!: FormGroup;
  allReservations: any[] = []; // 存放全部預約資料  

  constructor(private parkService: ApiService, private dialog: MatDialog,private fb: FormBuilder) {}

  

  ngOnInit(): void {
    this.minDate = new Date();
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^09\d{8}$/)]],
      name: ['', Validators.required],
      date: ['', Validators.required],
     time: ['', [Validators.required, this.workingHoursValidator.bind(this)]],
      carNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2,3}-\d{3,4}$/)]],
      remark: ['']
    });
  }

  workingHoursValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (!value) return null;

    const match = value.match(/^(\d{2}):(\d{2})$/);
    if (!match) return { invalidFormat: true };

    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);

    const totalMinutes = hours * 60 + minutes;
    const startMinutes = 8 * 60;      // 08:00
    const endMinutes = 16 * 60 + 30;  // 16:30

    if (totalMinutes < startMinutes || totalMinutes > endMinutes) {
      return { outOfRange: true };
    }
    return null;
  }


  // 格式化時間輸入為 HH:mm
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


  // 新增預約
  createReservation() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // 讓沒填過的欄位也顯示錯誤
      return;
    }

    let payload = { ...this.form.value };

 // 轉成 yyyy-MM-dd 字串，避免時區問題
  if (payload.date instanceof Date) {
      const d = payload.date;
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      payload.date = `${yyyy}-${mm}-${dd}`;
    }

    this.parkService.create(this.form.value).subscribe({
      next: (res) => {
        if(res.code === 200) {
          alert('預約成功');
          this.resetForm();
          
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('預約失敗');
      }
    });
  }

  // 查詢單筆預約
  find() {
  const dialogRef = this.dialog.open(DialogParkingFindComponent, {
    width: '400px',
    
  });

  // afterClosed 可以不用傳 phone 了，如果只是打開查詢對話框
  dialogRef.afterClosed().subscribe(() => {
    // 可選：這裡做額外動作，例如重新載入列表
  });
}

  // // 更新預約
  // updateReservation() {
  //   if (!this.form.phone) {
  //     alert('請先輸入電話查詢後才能更新');
  //     return;
  //   }

  //   this.parkService.update(this.form).subscribe({
  //     next: (res) => {
  //       if(res.code === 200) {
  //         alert('更新成功');
  //         this.resetForm();
          
  //       } else {
  //         alert(res.message);
  //       }
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('更新失敗');
  //     }
  //   });
  // }

  // // 刪除預約
  // deleteReservation() {
  //   if (!this.form.phone) {
  //     alert('請先輸入電話刪除');
  //     return;
  //   }

  //   this.parkService.delete(this.form.phone).subscribe({
  //     next: (res) => {
  //       if (res.code === 200) {
  //         alert('刪除成功');
  //         this.resetForm();
          
  //       } else {
  //         alert(res.message);
  //       }
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

 
  // 重置表單
  resetForm() {
  this.form.reset({
    date: null,
    time: '',
    name: '',
    phone: '',
    carNumber: '',
    remark: ''
  });
}
}
