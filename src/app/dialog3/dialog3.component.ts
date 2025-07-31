import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule   } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// 假设 PeriodicElement 结构已经定义在父组件中
export interface PeriodicElement {
  position: number;
  name: string;
  weight: string;
  symbol: string;
  over: string;
  link: string;
}
@Component({
  selector: 'app-dialog3',
  imports: [MatDialogModule ,MatFormFieldModule,MatInputModule,FormsModule,ReactiveFormsModule],
  templateUrl: './dialog3.component.html',
  styleUrl: './dialog3.component.scss'
})
export class Dialog3Component {
// 定义一个对象来接收传入的 data
editedElement: PeriodicElement;

constructor(
  public dialogRef: MatDialogRef<Dialog3Component>,
  @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
) {
  this.editedElement = { ...data }; // 克隆传入的 data 到 editedElement
}

// 提交修改后的数据
onSave(): void {
  this.dialogRef.close(this.editedElement);
}

// 关闭对话框
onCancel(): void {
  this.dialogRef.close();
}


}

