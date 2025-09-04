import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent {
  form: any = {
    date: null,
    time: '',
    name: '',
    phone: '',
    carNumber: '',
    remark: ''
  };

  allReservations: any[] = []; // 存放全部預約資料

  constructor(private parkService: ApiService, private dialog: MatDialog) {}

  // 新增預約
  createReservation() {
    if (!this.form.phone || !this.form.name || !this.form.date || !this.form.time || !this.form.carNumber) {
      alert('請填寫完整資料');
      return;
    }

    this.parkService.create(this.form).subscribe({
      next: (res) => {
        if(res.code === 200) {
          alert('預約成功');
          this.resetForm();
          this.getAllReservations(); // 更新列表
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

  // 更新預約
  updateReservation() {
    if (!this.form.phone) {
      alert('請先輸入電話查詢後才能更新');
      return;
    }

    this.parkService.update(this.form).subscribe({
      next: (res) => {
        if(res.code === 200) {
          alert('更新成功');
          this.resetForm();
          this.getAllReservations();
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

  // 刪除預約
  deleteReservation() {
    if (!this.form.phone) {
      alert('請先輸入電話刪除');
      return;
    }

    this.parkService.delete(this.form.phone).subscribe({
      next: (res) => {
        if (res.code === 200) {
          alert('刪除成功');
          this.resetForm();
          this.getAllReservations();
        } else {
          alert(res.message);
        }
      },
      error: (err) => console.error(err)
    });
  }

  // 取得全部預約
  getAllReservations() {
    this.parkService.getAllInfos().subscribe({
      next: (res) => {
        if(res.code === 200 || res.length) { // 假如返回 List
          this.allReservations = res;
        } else {
          this.allReservations = [];
        }
      },
      error: (err) => console.error(err)
    });
  }

  // 重置表單
  resetForm() {
    this.form = {
      date: null,
      time: '',
      name: '',
      phone: '',
      carNumber: '',
      remark: ''
    };
  }
}
