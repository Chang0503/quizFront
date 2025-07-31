import { Component,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule,FormControl,ReactiveFormsModule} from '@angular/forms';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

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
  styleUrl: './dialog-parking-find.component.scss'
})
export class DialogParkingFindComponent {
  license: string = '';
  phone: string = '';
  reservationData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogParkingFindComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // 查詢資料並顯示
  findReservation() {
    const storedData = localStorage.getItem('reservationData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      // 根據車牌和電話進行篩選
      if (parsedData.license === this.license && parsedData.phone === this.phone) {
        this.reservationData = parsedData;
      } else {
        alert('未找到匹配的預約資料');
      }
    } else {
      alert('沒有找到儲存的預約資料');
    }
  }

  // 關閉對話框
  closeDialog() {
    this.dialogRef.close();
  }
}
