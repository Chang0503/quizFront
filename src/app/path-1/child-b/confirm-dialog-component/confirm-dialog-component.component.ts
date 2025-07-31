import { Component } from '@angular/core';
import { MatDialogRef ,MatDialogModule } from '@angular/material/dialog';
@Component({

  selector: 'app-confirm-dialog-component',
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog-component.component.html',
  styleUrl: './confirm-dialog-component.component.scss'
})
export class ConfirmDialogComponentComponent {
constructor(private dialogRef: MatDialogRef<ConfirmDialogComponentComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
