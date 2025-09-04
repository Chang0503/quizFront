import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-dialog-parking-find',
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
    MatGridListModule
  ],
  templateUrl: './dialog-parking-find.component.html',
  styleUrls: ['./dialog-parking-find.component.scss']
})
export class DialogParkingFindComponent {
  license: string = '';
  phone: string = '';
  reservationData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogParkingFindComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parkService: ApiService
  ) {}

  // 查詢資料
  findReservation() {
  if (!this.phone) {
    alert('請輸入電話查詢');
    return;
  }

  this.parkService.getInfo(this.phone.trim()).subscribe({
    next: (res) => {
      console.log('API 回傳', res); // ✅ 印出結果看
      // 如果你後端沒有 code，就直接 assign
      this.reservationData = res;
    },
    error: (err) => {
      console.error(err);
      alert('查詢失敗');
    }
  });
}


  closeDialog() {
    this.dialogRef.close();
  }
}