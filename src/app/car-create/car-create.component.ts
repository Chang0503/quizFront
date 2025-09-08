import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../@services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-car-create',
  imports: [
    // 你現有的
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.scss']
})
export class CarCreateComponent implements OnInit {

  quizForm!: FormGroup;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['question', 'type', 'required', 'options', 'actions'];
  selectedForm: string = 'one';
  previewMode = false;
  isEdit = false;
  quizId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      direction: [''],
      question: [''],
      type: ['單選題'],
      required: [false],
      options: [''],
      questionVos: this.fb.array([]), // ← 這裡
    });

    // 判斷是否為編輯模式
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.quizId = +params['id'];
        this.loadQuiz(this.quizId);
      }
    });
  }

  setStep(step: string): void {
    this.selectedForm = step;
  }

  get questionVos(): FormArray {
    return this.quizForm.get('questionVos') as FormArray;
  }

  nextQuestionId = 1; // 新增一個欄位，用來自動編號題目
  addQuestion(): void {
    if ((this.quizForm.value.type === '單選題' || this.quizForm.value.type === '多選題')
      && !this.quizForm.value.options?.trim()) {
      alert('請輸入選項，用分號分隔');
      return;
    }
    if (!this.quizForm.value.question) return; // 防止空題目加入
    const q = this.fb.group({
      questionId: [this.nextQuestionId++], // 自動給 ID
      question: [this.quizForm.value.question, Validators.required],
      type: [this.quizForm.value.type, Validators.required],
      required: [this.quizForm.value.required],
      options: [this.quizForm.value.options]
    });
    this.questionVos.push(q);
    // 清空表單 input
    this.quizForm.patchValue({ question: '', options: '' });
    // 更新 table
    this.dataSource.data = this.questionVos.value;
  }


  removeQuestion(index: number): void {
    this.questionVos.removeAt(index);
    this.dataSource.data = this.questionVos.value;
  }


  togglePreview(): void {
    this.previewMode = !this.previewMode;
  }

  save() {

    // 轉換 questionVos 選項字串為陣列
    const questions = this.quizForm.value.questionVos?.map((q: any, index: number) => ({
      quizId: this.quizId || 0,  // ← 編輯模式會有 quizId，新增時可以先給 0
      questionId: q.questionId || index + 1,
      question: q.question,
      type: q.type,       // 預設 Single
      required: q.required,
      options: q.options ? q.options.split(';').map((o: string) => o.trim()).filter((o: any) => o)
        : []

    }));
    // 取得 startDate 與 endDate
    const startDate = this.formatDate(this.quizForm.value.startDate);
    const endDate = this.formatDate(this.quizForm.value.endDate);

    // 判斷是否 published
    const today = new Date();
    const start = new Date(startDate!);
    // const end = new Date(endDate!);
    const published = start.getTime() <= today.getTime();

    const payload = {
      quizId: this.quizId, // 如果是編輯模式，帶 quizId
      title: this.quizForm.value.title,
      direction: this.quizForm.value.direction,
      startDate: this.formatDate(this.quizForm.value.startDate), // YYYY-MM-DD
      endDate: this.formatDate(this.quizForm.value.endDate),     // YYYY-MM-DD
      published, // 自動判斷
      questionVos: questions
    };

    console.log('Payload:', payload);
    console.log('=== 更新前 payload ===');
    console.log(JSON.stringify(payload, null, 2)); // 格式化輸出，方便查看

    if (this.isEdit && this.quizId) {
      console.log('要送出的資料', questions);
      this.apiService.updateQuiz(payload).subscribe({
        next: res => {
          console.log('更新成功', res);
          this.router.navigate(['/childb']);
        },
        error: err => console.error('更新失敗', err)
      });
    } else {
      this.apiService.createQuiz(payload).subscribe({
        next: res => {
          console.log('新增成功', res);
          this.router.navigate(['/childb']);
        },
        error: err => console.error('新增失敗', err)
      });
    }
  }

  // 將 JS Date 轉成 YYYY-MM-DD
  formatDate(date: Date): string | null {
    if (!date) return null;
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }

  loadQuiz(id: number): void {
    this.apiService.getQuizById(id).subscribe(res => {
      const questions = res.questionList || [];
      if (questions.length > 0) {
        const first = questions[0];
        this.quizForm.patchValue({
          title: first.title,
          direction: first.direction,
          startDate: first.startDate,
          endDate: first.endDate
        });
      }
      // 顯示問題表格
      this.dataSource.data = questions;

      // 將 questionVos FormArray 也更新
      this.questionVos.clear();
      questions.forEach((q: any) => {
        const group = this.fb.group({
          quizId: [this.quizId], // ← 加上這行
          questionId: [q.questionId],
          question: [q.question, Validators.required],
          type: [q.type, Validators.required],
          required: [q.required],
          options: [(q.options || []).join(';')]  // 若 options 為 null，轉成空陣列
        });
        this.questionVos.push(group);
      });
    });
  }

  back(): void {
    this.router.navigate(['/childb']);
  }
}
