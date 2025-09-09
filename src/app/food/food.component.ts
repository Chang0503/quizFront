import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-food',
  imports: [MatIconModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})

export class FoodComponent {

  ngOnInit(): void {
    localStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('canFillQuiz');
  }


  images = [
    { src: '/food1.jpg', description: '使用漂流木和枯枝作為柴燒燃料熬煮肉燥的「相思麵」，肯定是你到小琉球想吃麵食類的首選', location: '屏東縣琉球鄉上杉路31巷7號', time: '08:00-14:00' },
    { src: '/food2.jpg', description: '從中式的包子、饅頭、蛋餅、豆漿、碗粿、飯糰; 刈包，再到西式的三明治漢堡、熱狗雞塊、炸雞薯條等應有盡有', location: '屏東縣琉球鄉和平路28-5號', time: '05:00-11:00' },
    { src: 'food3.jpg', description: '被各大部落客列入到小琉球不吃會悔的小琉球美食推薦名單裡，就知道它人氣有多高', location: '屏東縣琉球鄉三民路210號', time: '14:00-20:00 (售完為止)' },
    { src: 'food4.jpg', description: '炸雞走的是薄皮路線，雞肉口感不僅外酥裡嫩，還更香脆多汁', location: '屏東縣琉球鄉民生路30號', time: '15:00-22:00' },
    { src: 'food5.jpg', description: '無論你是愛拍照的，或是喜歡嘗鮮的，還是只是單純因為小琉球太熱想消暑一下，「來這吃冰吧」都是你不錯的選擇', location: '屏東縣琉球鄉民生路38號', time: '12:00-18:00 (周四公休)' },
    { src: 'food6.jpg', description: '菜單上提供40-50種左右的食材且和在地漁民合作，還有各式新鮮直送的海鮮、肉類、蔬菜、甜點、飲料可以無限吃', location: '屏東縣琉球鄉復興路161-52號', time: '17:00-20:30' },
    { src: 'food7.jpg', description: '讓你一次吃到海鮮+羊肉料理，店家對於自家羊肉料理食材的處理和選用都非常用心', location: '屏東縣琉球鄉仁愛路104-8號', time: '11:00-13:00、17:30-19:00 (周四公休)' },
    { src: 'food8.jpg', description: '堅持「手工」和「古法」製程再用柴燒慢火熬煮，才能讓每一批粉粿的口感不僅Q彈，還會帶有淡淡焦香', location: '屏東縣琉球鄉本漁路180號', time: '07:00-10:00' },
    { src: 'food9.jpg', description: '最大的特色就是新鮮度超高的海鮮食材，據說老闆每天清晨6點就會親自到市場挑選食材', location: '屏東縣琉球鄉觀光港路30之3號', time: '周一~周四 10:00-14:00、周五~周六 10:00-14:00, 17:30-20:30' },
    { src: 'food10.jpg', description: '整隻龍蝦、鮪魚塊、鮮蚵等配料，料多實在的「龍蝦版飯湯」也是很多在地朋友必推的', location: '屏東縣琉球鄉本漁路155號', time: '11:00-14:00, 17:00-20:00' },
    // 可以繼續增加更多圖片和描述
  ];

}
