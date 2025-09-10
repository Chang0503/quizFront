import { Component, OnInit } from '@angular/core';
import { ApiService } from './../@services/api.service';
import { FeedbackVo } from './../@models/feedback.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-write-path',
  imports: [],
  templateUrl: './write-path.component.html',
  styleUrl: './write-path.component.scss'
})
export class WritePathComponent implements OnInit {
  quizId!: number;
  title = '';
  direction = '';
  feedbackVoList: FeedbackVo[] = [];

  // 用來記錄哪些填答者被展開
  expandedPhones = new Set<string>();

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.quizId = +id;
        this.loadFeedback();
      }
    });
  }

  loadFeedback(): void {

    this.apiService.getFeedbackByQuizId(this.quizId).subscribe({

      next: (res) => {
        console.log('API 回傳資料:', res); // 👈 看看 answerVoList 裡的題目欄位叫什麼
        this.title = res.title;
        this.direction = res.direction;
        this.feedbackVoList = res.feedbackVoList;
      },
      error: (err) => {
        console.error('取得問卷填答資料時發生錯誤：', err);
      }
    });
  }

  toggleExpand(phone: string): void {
    if (this.expandedPhones.has(phone)) {
      this.expandedPhones.delete(phone);
    } else {
      this.expandedPhones.add(phone);
    }
  }

  isExpanded(phone: string): boolean {
    return this.expandedPhones.has(phone);
  }

  back(): void {
    this.router.navigate(['/childb']);
  }

}

