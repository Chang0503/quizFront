import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../../@services/service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dialog-2-path',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dialog-2-path.component.html',
  styleUrl: './dialog-2-path.component.scss'
})
export class Dialog2PathComponent implements OnInit {
  dialogData: any;

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.dialogData = this.service.getdialog();
    console.log('從服務獲取的資料:', this.dialogData);
  }

  goBackToA() {
    this.service.setReturnFlag(true);  // 告訴 A 頁「我從 B 頁回來了」
    this.router.navigate(['/childb']);
  }
}
