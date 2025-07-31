import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatIconModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  images: string[] = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
  ];

  hotImages = [
    { src: '/hot1.jpg', label: '紅番石' },
    { src: '/hot2.jpg', label: '花瓶岩' },
    { src: '/hot3.jpg', label: '網美老木' },
    { src: '/hot4.jpg', label: '龍蝦洞' },
    { src: '/hot5.jpg', label: '望海亭' },
  ];

  tellImages =[
    {src:'/tell1.jpg',description1:'船票來回400 民宿訂票380',description2:'民宿平日半價以上',description3:'碼頭有專門在賣價差的阿姨會相較便宜'},
    {src:'/tell2.jpg',description1:'8人以上9折',description2:'到府接送 來電123456',description3:'高鐵站有直達公車',description4:'自行開車前往有配合停車場'},
    {src:'/tell3.jpg',description1:'下船後右手邊有市場',description2:'(瑞字號)旗魚黑輪必吃',description3:'XX生魚片必吃'},
  ];

  currentIndex = 0;
  intervalId: any;
  hoverIndex: number = -1;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }
}
