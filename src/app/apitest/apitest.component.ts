import { Component, OnInit } from '@angular/core';
import { ApiService } from '../@services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apitest',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apitest.component.html',
  styleUrls: ['./apitest.component.scss']
})
export class ApitestComponent implements OnInit {

  quizzes: any[] = [];

  quizForm = {
    quizId: 0, // 0 表示新增，非 0 表示編輯
    title: '',
    direction: '',
    startDate: '',
    endDate: '',
    published: false,
    questionVos: [
      {
        questionId: 1,
        question: '',
        type: '',
        required: false,
        optionsText: '' // 用逗號分隔字串
      }
    ]
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.apiService.getAllQuizzes().subscribe(data => {
      this.quizzes = data.quizList || [];
    });
  }

  // 建立或更新 quiz
  submitQuiz() {
  const requestPayload = {
    quizId: this.quizForm.quizId,  // 一定要帶 quizId，後端才能辨識更新
    title: this.quizForm.title,
    direction: this.quizForm.direction,
    startDate: this.quizForm.startDate,
    endDate: this.quizForm.endDate,
    published: this.quizForm.published,
    questionVos: this.quizForm.questionVos.map(q => ({
      questionId: q.questionId,       // 題目 ID，有助後端更新特定題目
      quizId: this.quizForm.quizId,  // 問卷ID，保持一致
      question: q.question,           // 題目文字
      type: q.type,                   // 題型
      required: q.required,           // 必填與否
      options: q.optionsText.split(',').map(o => o.trim())  // 選項陣列
    }))
  };

  if (this.quizForm.quizId === 0) {
    this.apiService.createQuiz(requestPayload).subscribe({
      next: res => {
        console.log('建立成功', res);
        this.loadQuizzes();
        this.resetForm();
      },
      error: err => {
        console.error('建立失敗', err);
      }
    });
  } else {
    this.apiService.updateQuiz(requestPayload).subscribe({
      next: res => {
        console.log('更新成功', res);
        this.loadQuizzes();
        this.resetForm();
      },
      error: err => {
        console.error('更新失敗', err);
      }
    });
  }
}

  // 編輯 quiz：將資料載入表單
  editQuiz(quiz: any) {
    this.quizForm = {
      quizId: quiz.id,
      title: quiz.title,
      direction: quiz.direction,
      startDate: quiz.startDate,
      endDate: quiz.endDate,
      published: quiz.published,
      questionVos: (quiz.questions || quiz.questionVos || []).map((q: any) => ({
        questionId: q.questionId,
        question: q.question,
        type: q.type,
        required: q.required,
        optionsText: (q.options || []).join(',')
      }))
    };
  }

  // 刪除 quiz
  deleteQuiz(id: number) {
    this.apiService.deleteQuiz({ idList: [id] }).subscribe({
      next: res => {
        console.log('刪除成功', res);
        this.loadQuizzes();
      },
      error: err => {
        console.error('刪除失敗', err);
      }
    });
  }

  resetForm() {
    this.quizForm = {
      quizId: 0,
      title: '',
      direction: '',
      startDate: '',
      endDate: '',
      published: false,
      questionVos: [
        {
          questionId: 1,
          question: '',
          type: '',
          required: false,
          optionsText: ''
        }
      ]
    };
  }
}
