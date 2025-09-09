import { ServiceService } from './../../@services/service';
import { Component, } from '@angular/core';
import { RouterOutlet, Router, RouterLink, } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../@services/api.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-child-a',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './child-a.component.html',
  styleUrl: './child-a.component.scss'
})

export class ChildAComponent implements OnInit {

  quizId: number = 0;
  array1: any[] = [];
  title = '';
  startDate = '';
  endDate = '';
  direction = '';
  name: string = '';
  phone: string = '';
  email: string = '';
  number: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiservice: ApiService,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('adminLoggedIn');
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.quizId = +idParam;
        this.loadQuizData(this.quizId);
      }
    });

    const savedData = this.service.getAnswers();
    if (savedData) {
      this.name = savedData.name || '';
      this.phone = savedData.phone || '';
      this.email = savedData.email || '';
      this.number = savedData.number || '';
      this.array1 = savedData.array1 || [];
    }
  }

  loadQuizData(id: number): void {
    console.log('收到的 ID:', id);


    this.apiservice.getQuizById(id).subscribe({
      next: response => {
        console.log('API 回傳資料', response);

        if (!response || !Array.isArray(response.questionList)) {
          alert('取得問卷詳細資料格式錯誤');
          return;
        }

        const meta = response.questionList[0];
        this.title = meta.title;
        this.direction = meta.direction;
        this.startDate = meta.startDate;
        this.endDate = meta.endDate;
        // 先轉換 API 回來的資料
        const newArray = response.questionList.map((q: any, index: number) => ({
          quesId: q.id ?? (index + 1),
          questName: q.question,
          type: q.type,
          need: q.required,
          answers: '',
          choose: (q.options || []).map((opt: string) => ({
            chooseName: opt,
            Boolean: false
          })),

        }));

        // 套用之前使用者填過的答案（若有）
        const savedData = this.service.getAnswers();
        if (savedData && Array.isArray(savedData.array1)) {
          for (let i = 0; i < newArray.length; i++) {
            const savedQ = savedData.array1[i];
            const newQ = newArray[i];

            if (savedQ && newQ) {
              newQ.answers = savedQ.answers || '';

              if (Array.isArray(savedQ.choose) && Array.isArray(newQ.choose)) {
                for (let j = 0; j < newQ.choose.length; j++) {
                  newQ.choose[j].Boolean = savedQ.choose[j]?.Boolean || false;
                }
              }
            }
          }

          // 同步基本資訊欄位（可選）
          this.name = savedData.name || '';
          this.phone = savedData.phone || '';
          this.email = savedData.email || '';
          this.number = savedData.number || '';
        }

        // 指派到畫面要顯示的 array1
        this.array1 = newArray;

      },
      error: err => {
        console.error('getQuizById 取得錯誤', err);
        alert('取得問卷詳細資料失敗');
      }
    });
  }


  Preview(): void {
    if (!this.name || !this.phone || !this.number) {
      alert('姓名,電話未填或人數未填');
      return;
    }

    // 檢查必填題目
    const emptyRequired = this.array1.some(q => q.need && !q.answers);
    if (emptyRequired) {
      alert('有必填題目未填寫');
      return;
    }

    const jsonData = {
      quizId: this.quizId,
      array1: this.array1,
      name: this.name,
      phone: this.phone,
      email: this.email,
      number: this.number,
      title: this.title,
      startDate: this.startDate,
      endDate: this.endDate,
      direction: this.direction,
    };

    this.service.saveAnswers(jsonData);  // 存到 service
    sessionStorage.setItem('canFillQuiz', 'true'); // ✅ 設置權限
    this.router.navigate(['/childa_1']); // 導去預覽頁
  }

  back(): void {
    this.service.clearAnswers();
    sessionStorage.removeItem('canFillQuiz');
    this.router.navigate(['/path1']);
  }
}
