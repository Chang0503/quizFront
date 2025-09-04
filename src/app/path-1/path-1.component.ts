import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from './../@services/api.service';
import { DialogComponent } from '../dialog/dialog.component';

import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../@services/service';

@Component({
  selector: 'app-path-1',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
  ],
  templateUrl: './path-1.component.html',
  styleUrls: ['./path-1.component.scss'],
})
export class Path1Component implements OnInit, AfterViewInit {
  inputData: string = '';

  displayedColumns: string[] = ['title', 'direction', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<any>([]);
  questionnaires: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog, private service : ServiceService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadQuizzes(): void {
  this.apiService.getAllQuizzes().subscribe({
    next: (res: any) => {
      const allQuizzes = res.quizList || [];

      // const today = new Date();
      // today.setHours(0, 0, 0, 0); // 清除時間，只比較日期

      // // 過濾條件：published 為 true 且 endDate 大於等於今天
      // const filteredQuizzes = allQuizzes.filter((q: any)=> {
      //   const endDate = new Date(q.endDate || q.endTime);
      //   endDate.setHours(0, 0, 0, 0);
      //   return q.published === true && endDate >= today;
      // });

      // this.questionnaires = filteredQuizzes;
      // this.service.setQuizList(this.questionnaires);
      // console.log('篩選後的問卷：', this.questionnaires);
      this.questionnaires = allQuizzes;

      this.dataSource.data = this.questionnaires.map(q => ({
        id: q.id,
        title: q.title,
        direction: q.direction || q.remark || '',
        startDate: q.startDate || q.startTime,
        endDate: q.endDate || q.endTime,
      }));
    },
    error: (err) => console.error('讀取問卷失敗', err),
  });
}


  changeMonth(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filtered = this.questionnaires.filter(q => q.title.toLowerCase().includes(value));
    this.dataSource.data = filtered.map(q => ({
      title: q.title,
      direction: q.direction || q.remark || '',
      startDate: q.startDate || q.startTime,
      endDate: q.endDate || q.endTime,
    }));
  }

  // 管理員登入按鈕
  enter(): void {
    this.dialog.open(DialogComponent, {
      data: { message: '請輸入帳號密碼' },
    });
  }
  navigateToAnswer(id: number): void {
  this.router.navigate(['/childa', id]);
}
}
