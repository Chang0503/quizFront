import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-child-3',
  imports: [],
  templateUrl: './child-3.component.html',
  styleUrl: './child-3.component.scss'
})

export class Child3Component {
  ngOnInit(): void {
// 獲取 canvas 元素
let ctx = document.getElementById('chart') as HTMLCanvasElement;

// 設定數據
let data = {
  // x 軸文字
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    // 第一組資料
    {
      // 上方分類文字
      label: '月銷售',
      // 數據
      data: [30, 20, 40, 32, 45, 24],
      // 顏色
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      // 邊框顏色
      borderColor: 'rgba(75, 192, 192, 1)',
      // 邊框寬度
      borderWidth: 1,
    },
  ],
};

// 圖表選項
var options = {
  scales: {
    y: {
      // y 軸從 0 開始
      beginAtZero: true,
    },
  },
};

// 創建圖表
new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options,
});
}
}
