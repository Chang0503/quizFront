import { Component,ChangeDetectionStrategy,ViewChild,ElementRef} from '@angular/core';
import {FormsModule,FormControl,ReactiveFormsModule} from '@angular/forms';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogParkingComponent } from '../dialog-parking/dialog-parking.component';
import { DialogParkingFindComponent } from '../dialog-parking-find/dialog-parking-find.component';
import { MatIconModule } from '@angular/material/icon';


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
  styleUrl: './parking.component.scss'
})
export class ParkingComponent {

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('phoneInput') phoneInput!: ElementRef;
  @ViewChild('licenseInput') licenseInput!: ElementRef;
  @ViewChild('noteInput') noteInput!: ElementRef;
  @ViewChild('startDateInput') startDateInput!: ElementRef;
  @ViewChild('endDateInput') endDateInput!: ElementRef;

  formControl: FormControl<Date | null>;
  minTime = new Date();
  maxTime = new Date();
  constructor(private dialog: MatDialog) {
    const initialValue = new Date();
    initialValue.setHours(8, 0, 0);
    this.formControl = new FormControl(initialValue);
  }
  clearFormFields() {
    this.nameInput.nativeElement.value = '';
    this.phoneInput.nativeElement.value = '';
    this.licenseInput.nativeElement.value = '';
    this.noteInput.nativeElement.value = '';
    this.startDateInput.nativeElement.value = '';
    this.endDateInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }
  next() {
    const name = this.nameInput.nativeElement.value?.trim();
    const phone = this.phoneInput.nativeElement.value?.trim();
    const license = this.licenseInput.nativeElement.value?.trim();
    const note = this.noteInput.nativeElement.value?.trim();
    const startDate = this.startDateInput.nativeElement.value?.trim();
    const endDate = this.endDateInput.nativeElement.value?.trim();
    const time = this.formControl.value;


    if (!name || !phone || !license || !note || !startDate || !endDate || !time) {
      alert('請完整填寫所有欄位');
      return;
    }

    const data = { name, phone, license, note, startDate, endDate, time };
    const dialogRef = this.dialog.open(DialogParkingComponent, { data });

    // ✅ 訂閱 dialog 傳出的 clearForm 事件
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.clearFormFields();
      }
    });
  }

  find() {
    this.dialog.open(DialogParkingFindComponent, {
      width: '400px',
    });
  }
}
