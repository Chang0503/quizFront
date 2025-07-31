import { Component,Inject, Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialogModule} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-dialog-parking',
  imports: [MatCardModule
    ,CommonModule
    ,MatDialogModule

  ],
  templateUrl: './dialog-parking.component.html',
  styleUrl: './dialog-parking.component.scss'
})
export class DialogParkingComponent {
  @Output() clearForm: EventEmitter<void> = new EventEmitter(); // 用來通知父組件清空表單

  constructor(
    public dialogRef: MatDialogRef<DialogParkingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  onSubmit() {
    // 將資料儲存到 localStorage
    const formData = {
      name: this.data.name,
      phone: this.data.phone,
      license: this.data.license,
      note: this.data.note,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      time: this.data.time
    };

    // 儲存資料到 localStorage
    localStorage.setItem('reservationData', JSON.stringify(formData));

    // 顯示資料已儲存
    alert('預約成功');

    // 關閉對話框
    this.dialogRef.close(true);
  }
}
