import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule,} from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,MatIconModule,MatToolbarModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})





export class AppComponent {
  constructor(
    private router1: Router,
    private dialog: MatDialog
  ) { };
  home(){
    this.router1.navigate(['/home']);
  }
  car(){
    this.router1.navigate(['/path1']);
  }
  food(){
    this.router1.navigate(['/food']);
  }
  parking(){
    this.router1.navigate(['/parking']);
  }
  hotel(){
    this.router1.navigate(['/hotel']);
  }
  admin(): void {
      this.dialog.open(DialogComponent, {
        data: { message: '請輸入帳號密碼' },
      });
    }
}
