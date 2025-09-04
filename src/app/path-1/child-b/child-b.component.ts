import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2Component } from '../../dialog-2/dialog-2.component';
import { ApiService } from '../../@services/api.service';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../@services/service';
import { ConfirmDialogComponentComponent } from './confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-child-b',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,


  ],
  templateUrl: './child-b.component.html',
  styleUrls: ['./child-b.component.scss']
})
export class ChildBComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['actions', 'title', 'direction', 'startDate', 'endDate', 'published'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  inputData: string = ''
  constructor(
    private router: Router,
    private apiService: ApiService,
    private dialog: MatDialog,
    private service:ServiceService
  ) {}


  ngOnInit(): void {
if (this.service.getReturnFlag()) {
    this.service.setReturnFlag(false); // ✅ 用完記得關掉 flag
    this.dialog.open(Dialog2Component);    // ✅ 打開 dialog 並載入資料
    this.loadAllPark();
  }

    this.loadQuizzes();

    // 自定 filter 邏輯（例如只搜尋 title 欄位）
    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.title?.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 6;
  }

  loadQuizzes(): void {
    this.apiService.getAllQuizzes().subscribe({
      next: (res) => {
        console.log('API 傳回資料：', res);
        this.dataSource.data = res.quizList || [];
      },
      error: (err) => {
        console.error('載入問卷失敗', err);
      }
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(Dialog2Component);
     dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // result 是剛剛新增成功回傳的 quiz 資料，直接刷新列表即可
      this.loadQuizzes();
    }
  });
}

  editElement(quiz: any): void {
   const dialogRef = this.dialog.open(Dialog2Component, {
    data: { id: quiz.id }  // 傳入要編輯的問卷 ID
  });
    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const payload = this.transformFormToPayload(result,  quiz.id);
      this.apiService.updateQuiz(payload).subscribe({
        next: () => this.loadQuizzes(),
        error: err => console.error('更新失敗', err)
      });
    }
  });
}

  deleteElement(quiz: any): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponentComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.apiService.deleteQuiz({ idList: [quiz.id] }).subscribe({
        next: () => this.loadQuizzes(),
        error: err => console.error('刪除失敗', err)
      });
    }
  });
}

  changeMonth(event: Event): void {
    const keyword = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = keyword;
  }

  transformFormToPayload(formData: any, quizId: number): any {
    return {
      quizId,
      title: formData.title,
      direction: formData.direction,
      startDate: formData.startDate,
      endDate: formData.endDate,
      published: formData.published,
      questionVos: (formData.questionVos || []).map((q: any) => ({
        questionId: q.questionId || 0,
        quizId,
        question: q.question,
        type: q.type,
        required: q.required,
        options: typeof q.optionsText === 'string'
          ? q.optionsText.split(',').map((o: string) => o.trim())
          : q.options
      }))
    };
  }

  back(): void {
    this.router.navigate(['/home']);
  }
  navigateToWrite(id: number): void {
  this.router.navigate(['/write', id]);
}
currentTable: 'connect' | 'park' = 'connect';

switchTable() {
  this.currentTable = this.currentTable === 'connect' ? 'park' : 'connect';
}


//停車場
parkData: any[] = [];
parkDisplayedColumns: string[] = ['id', 'name', 'date', 'actions'];
selectedPark: any = null;

// ngOnInit() {
//   this.loadAllPark();
// }

loadAllPark() {
  this.apiService.getAllInfos().subscribe({
    next: (res: any) => {
      if(res.code === 200) {
        this.parkData = res.list || []; // 假設 API 回傳 list
      } else {
        alert(res.message || '讀取停車場資料失敗');
      }
    },
    error: (err) => console.error(err)
  });
}

// 查看單筆
viewInfo(phone: string) {
  this.apiService.getInfo(phone).subscribe({
    next: (res: any) => {
      if (res.code === 200) {
        this.selectedPark = res.data || res; // 後端可能直接回 data 或 res
      } else {
        alert(res.message || '查無資料');
      }
    },
    error: (err) => {
      console.error(err);
      alert('查詢失敗');
    }
  });

}
}
