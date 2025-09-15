import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../../../@services/service';
import { Router } from '@angular/router';
import { ApiService } from './../../../@services/api.service';
import { CommonModule } from '@angular/common'; // ✅ 加入 CommonModule
@Component({
  selector: 'app-child-a-1',
  imports: [CommonModule],
  templateUrl: './child-a-1.component.html',
  styleUrl: './child-a-1.component.scss'
})
export class ChildA1Component implements OnInit {

  userdata: any = {};
  back(): void {
    console.log('back(): userdata =', this.userdata);
    this.service.saveAnswers(this.userdata);
    this.router.navigate(['/childa', this.userdata.quizId])

  }


  enter(): void {
    // 從 userdata 裡挑出要送的欄位
    const answerVoList = this.userdata.array1.map((item: any) => ({
      quesId: item.quesId,
      answerList: Array.isArray(item.answers) && item.answers.length > 0
        ? item.answers
        : item.choose && Array.isArray(item.choose) && item.choose.some((c: any) => c.Boolean)
          ? item.choose
            .filter((c: any) => c.Boolean)
            .map((c: any) => c.chooseName)
          : (item.answers && item.answers.trim() !== '')
            ? [item.answers]
            : []
    }));

    const payload = {
      userName: this.userdata.name,
      phone: this.userdata.phone,
      email: this.userdata.email,
      age: this.userdata.number,
      date: this.userdata.date, // ✅ 加這行
      quizId: this.userdata.quizId,
      answerVoList: answerVoList
    };

    this.apiService.fillin(payload).subscribe({
      next: (res) => {
        console.log('填寫成功', res);
        sessionStorage.removeItem('canFillQuiz');
        this.service.clearAnswers();
        this.router.navigate(['/path1']);

      },
      error: (err) => {
        console.error('填寫失敗', err);
        // 可以顯示錯誤訊息
      }
    });

    console.log('送出資料', payload);
  }

  constructor(
    private service: ServiceService,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('adminLoggedIn');
    this.userdata = this.service.getAnswers();
    // 確保 date 是 Date 物件
    if (this.userdata && this.userdata.date) {
      this.userdata.date = new Date(this.userdata.date);
    }
    console.log(this.userdata);
  }

}

