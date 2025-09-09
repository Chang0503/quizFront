import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // 引入 FormsModule
import { CommonModule } from '@angular/common';  // 引入 CommonModule
import { ReactiveFormsModule } from '@angular/forms';  // 如果需要使用响应式表单，则引入 ReactiveFormsModule

interface Hotel {
  name: string;
  src: string;
  breakfast?: string;
  swim?: string;
  tub?: string;
  ocean?: string;
  kid?: string;
  location?: string;
  comment?: string;
  price?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  showDescription?: boolean;
}

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {
  ngOnInit(): void {
    localStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('canFillQuiz');
  }

  allHotels: Hotel[] = [
    {
      src: '/hotel1.jpg', breakfast: '早餐', tub: '浴缸', name: '輪廓莊園',
      description: '擁有寬敞花園與明亮大廳，給人滿滿的度假感。每間房都有獨立陽台和躺椅，白天可俯瞰莊園花園，晚上還能躺著看星星，氣氛超棒！',
      showDescription: false, reviewCount: 10, rating: 9.8, price: '2,550',
    },
    {
      src: '/hotel2.jpg', breakfast: '早餐', ocean: '海景', kid: '親子友善', name: '朵小路',
      description: '網美超愛的民宿！融合北歐風與工業風，門口有一對摩艾超好拍，有提供嬰兒床！房內還有超浮誇旋轉木馬！',
      showDescription: false, reviewCount: 20, rating: 9.7, price: '2,800',
    },
    {
      src: '/hotel3.jpg', breakfast: '早餐', ocean: '海景', name: '就在海邊 Marbordo',
      description: '擁有無敵海景，超大落地窗，躺在床上就能欣賞到一整片海洋！',
      showDescription: false, reviewCount: 15, rating: 9.5, price: '2,250',
    },
    {
      src: '/hotel4.jpg', breakfast: '早餐', ocean: '海景', tub: '浴缸', name: '極の宿 eXtreme',
      description: '民宿主人頂級製作，精心設計的細節，奢華高檔的住宿,採用大片落地窗，讓你躺在床上就能輕鬆欣賞到海景。 ',
      showDescription: false, reviewCount: 30, rating: 9.8
    },
    {
      src: '/hotel5.jpg', name: '海邊打盹',
      description: '交通便利，步行即可到 7-11、餐廳、SUP 活動地點，地理位置超方便！',
      showDescription: false, reviewCount: 10, rating: 9.5, price: '2,280',
    },
    {
      src: '/hotel6.jpg', swim: '泳池', ocean: '海景', tub: '浴缸', name: '地中海',
      description: '一秒偽出國！藍頂白牆的地中海建築，加上蔚藍海岸，彷彿來到希臘渡假。附有無邊際泳池、SPA按摩、蒸氣室、烤箱',
      showDescription: false, reviewCount: 25, rating: 9.8, price: '2,980',

    },
    {
      src: '/hotel7.jpg', breakfast: '早餐', name: '1302',
      description: '以貨櫃打造，各房間有專屬戶外露台，窗簾一打開就是無敵海景，對於喜歡看海發呆的人，這裡絕對是首選',
      showDescription: false, reviewCount: 15, rating: 9.6, price: '1,980',
    },
    {
      src: '/hotel8.jpg', swim: '泳池', ocean: '海景', name: '小海子',
      description: '位於小琉球較高之處，人潮較少，環境安靜，價格親民。戶外還有打卡必備的游泳池。',
      showDescription: false, reviewCount: 15, rating: 9.6, price: '2,380',
    },
    {
      src: '/hotel9.jpg', swim: '泳池', breakfast: '早餐', ocean: '海景', name: '朵貓貓',
      description: '可待在大片草地上的戲水池邊，也能隨時跳下泳池玩耍，每面窗戶都可看到滿滿的海景及整片草地',
      showDescription: false, reviewCount: 25, rating: 9.7, price: '3,580',
    },
    {
      src: '/hotel10.jpg', breakfast: '早餐', name: '大海的天空',
      description: '！希臘式風格，屋內外都是淺白色調，簡約有品味，老闆帶領的導賞團講解很好，非常專業',
      showDescription: false, reviewCount: 20, rating: 9.7, price: '2,750',
    },
  ];

  // 筛选条件的状态
  filters = {
    breakfast: false,
    swim: false,
    tub: false,
    ocean: false
  };

  // 计算过滤后的酒店列表
  filterHotels(): Hotel[] {
    return this.allHotels.filter(hotel => {
      if (this.filters.breakfast && !hotel.breakfast) return false;
      if (this.filters.swim && !hotel.swim) return false;
      if (this.filters.tub && !hotel.tub) return false;
      if (this.filters.ocean && !hotel.ocean) return false;
      return true;
    });
  }
  shouldShow(hotel: any): boolean {
    if (this.filters.breakfast && !hotel.breakfast) return false;
    if (this.filters.swim && !hotel.swim) return false;
    if (this.filters.tub && !hotel.tub) return false;
    if (this.filters.ocean && !hotel.ocean) return false;
    return true;
  }
  toggleDescription(hotel: Hotel) {
    hotel.showDescription = !hotel.showDescription;
  }
}
