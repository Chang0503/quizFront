import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from './../@services/service';
import { ApiService } from './../@services/api.service';
import { MatCheckboxModule } from '@angular/material/checkbox';




export interface PeriodicElement {
  questionId?: number; // 加上這行
  question: string;
  type: string;
  options: string[];
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-dialog-2',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule
  ],
  templateUrl: './dialog-2.component.html',
  styleUrls: ['./dialog-2.component.scss']
})
export class Dialog2Component {

  addForm: FormGroup;
  selectedForm: string = 'one';
  optionInput: string = '';


  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = ['question', 'type', 'options', 'actions'];

  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<Dialog2Component>,
    private fb: FormBuilder,
    private service: ServiceService,
    private apiService: ApiService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.addForm = this.fb.group({
      title: ['', Validators.required],
      direction: ['', Validators.required],
      startTime: ['', Validators.required], // 對應 start_date
      endTime: ['', Validators.required],   // 對應 end_date
      question: [''],        // 單題輸入欄位（新增用）
      type: ['單選題'],      // 單題輸入欄位
      required: [false],     // 單題輸入欄位
      options: [''],         // 單題輸入欄位
    });
    this.isEditMode = !!this.data?.id; // 有 id 就是編輯模式
    if (this.isEditMode) {
      this.selectedForm = 'three';
      // 編輯模式：從 API 載入 quiz 資料
      this.apiService.getQuizById(this.data.id).subscribe((quiz: any) => {
        console.log('API 回傳完整資料:', quiz);

        this.addForm.patchValue({
          title: quiz.title,
          direction: quiz.direction,
          startTime: quiz.startDate, // 後端是 start_date，但 API 回傳這裡可能轉成 startTime
          endTime: quiz.endDate,     // 同上
        });

        // 題目清單處理
        if (quiz.questionList && quiz.questionList.length > 0) {
          const questionList = quiz.questionList.map((q: any) => ({
            questionId: q.questionId,
            question: q.question,
            type: q.type,
            required: q.required,
            options: q.options,
          }));
          this.dataSource.data = questionList;
        } else {
          console.warn('API 回傳的題目資料為空或未定義');
          this.dataSource.data = [];
        }
      }, (error) => {
        console.error('API 取得 quiz 失敗:', error);
      });
    } else {
      // 新增模式：從暫存取資料
      const saved = this.service.getdialog();
      if (saved) {
        this.addForm.patchValue({
          title: saved.title,
          direction: saved.direction,
          startTime: saved.startTime,
          endTime: saved.endTime,
        });

        if (saved.questions?.length > 0) {
          const questionList = saved.questions.map((q: any) => ({
            questionId: q.questionId,
            question: q.question,
            type: q.type,
            required: q.required,
            options: q.options,
          }));
          this.dataSource.data = questionList;
        }
      }
    }
  }



  // 加入題目
  addOption() {
    const question: string = this.addForm.get('question')?.value.trim() || '';
    const type: string = this.addForm.get('type')?.value || '';
    const optionsString: string = this.addForm.get('options')?.value.trim() || '';

    if (question) {
      const options: string[] = optionsString
        ? optionsString.split(';').map((opt: string) => opt.trim()).filter((opt: string) => opt)
        : [];

      const newQuestion: PeriodicElement = {
        question,
        type,
        options: options.length > 0 ? options : ['輸入框']
      };

      this.dataSource.data = [...this.dataSource.data, newQuestion];

      this.addForm.patchValue({ question: '', type: '單選題', options: '' });
    }
  }


  removeOption(index: number) {
    const data = this.dataSource.data;
    data.splice(index, 1);
    this.dataSource.data = [...data];
  }

  onsave() {
    if (this.addForm.valid) {
      const typeMap: Record<string, string> = {
        '單選題': 'Single',
        '多選題': 'Multi',
        '文字題': 'Text'
      };

      const questionsData = this.dataSource.data.map((element, index) => {
        const mappedType = typeMap[element.type] || element.type;
        const questionObj: any = {
          quizId: this.data?.id ?? 0,
          questionId: element.questionId ?? index + 1,
          question: element.question,
          type: mappedType,
          required: true,
        };
        if (mappedType !== 'Text') {
          questionObj.options = element.options;
        }
        return questionObj;
      });
      const startDateStr = this.formatDate(this.addForm.get('startTime')?.value);
      const endDateStr = this.formatDate(this.addForm.get('endTime')?.value);

      const now = new Date();
      const startDate = startDateStr ? new Date(startDateStr) : null;
      const endDate = endDateStr ? new Date(endDateStr) : null;

      // 判斷是否已經到開始時間（或其他邏輯）
      const published = startDate ? now >= startDate : false;
      const payload = {
        quizId: this.data?.id ?? 0,
        title: this.addForm.get('title')?.value,
        direction: this.addForm.get('direction')?.value,
        startDate: this.formatDate(this.addForm.get('startTime')?.value),
        endDate: this.formatDate(this.addForm.get('endTime')?.value),
        published: published,
        questionVos: questionsData,
      };
      console.log('送出的更新資料:', JSON.stringify(payload, null, 2));  // <-- 在這裡印出
      const request$ = this.isEditMode
        ? this.apiService.updateQuiz(payload)
        : this.apiService.createQuiz(payload);

      request$.subscribe({
        next: (res) => {
          console.log(this.isEditMode ? '更新成功' : '新增成功', res);
          this.dialogRef.close(res);

        },
        error: (err) => {
          console.error(this.isEditMode ? '更新失敗' : '新增失敗', err);
          if (err.error?.message) {
            console.error('錯誤訊息:', err.error.message);  // <== 印出後端自訂訊息
          }
        }

      });

    } else {
      console.warn('❌ 表單驗證未通過');
      this.addForm.markAllAsTouched(); // 提示未填欄位
    }

  }






  // 工具方法：轉成 yyyy-MM-dd 格式
  formatDate(date: Date | string): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().substring(0, 10); // 'YYYY-MM-DD'
  }


  // 取消操作
  onCancel(): void {
    this.addForm.reset();
    this.dataSource.data = [];
    this.service.clearDialog();
    this.dialogRef.close();
  }
  preview() {
    const formValue = this.addForm.value;

    const previewData = {
      title: formValue.title,
      direction: formValue.direction,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      questions: this.dataSource.data
    };
    this.dialogRef.close();
    this.service.savedialog(previewData);  // 存入 Service
    this.router.navigate(['/dialogpath2']);  // 導頁到預覽頁
  }

  // 切換表單段落
  one() { this.selectedForm = 'one'; }
  two() { this.selectedForm = 'two'; }
  three() { this.selectedForm = 'three'; }
}

