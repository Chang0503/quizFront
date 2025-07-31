import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  currentId: number = 0;

  private userAnswers: any;
  private dialogAnswers: any;
  private returnFromPreview: boolean = false;
  private questionnaires: any[] = [];
  private quizList: any[] = [];

  // 存資料
  setQuizList(data: any[]): void {
    this.quizList = data;
  }

  // 取資料
  getQuizList(): any[] {
    return this.quizList;
  }
  constructor() {
    const saved = localStorage.getItem('questionnaires');
    if (saved) {
      this.questionnaires = JSON.parse(saved);
    }
  }

  saveAnswers(jasonData: any): void {
    this.userAnswers = jasonData;
    if (jasonData.id) {
      this.currentId = jasonData.id;  // ➤ 儲存 id
    }
  }

  getAnswers(): any{
    return this.userAnswers;
  }

  clearAnswers(): void {
    this.userAnswers = null // 清空資料
    this.currentId = 0;
  }


  // 保存對話框資料
  savedialog(data: any): void {
    this.dialogAnswers = data;
    localStorage.setItem('dialogAnswers', JSON.stringify(data));
  }

  // 取得對話框資料
  getdialog(): any {
    if (!this.dialogAnswers) {
      const saved = localStorage.getItem('dialogAnswers');
      if (saved) {
        this.dialogAnswers = JSON.parse(saved);
      }
    }
    return this.dialogAnswers;
  }

  // 清除對話框資料
  clearDialog(): void {
    this.dialogAnswers = null;  // 清空对话框数据
    localStorage.removeItem('dialogAnswers');  // 使用正确的键来删除 localStorage 中的对话框数据
  }

  setReturnFlag(flag: boolean) {
    this.returnFromPreview = flag;
  }

  getReturnFlag(): boolean {
    return this.returnFromPreview;
  }

  clearReturnFlag() {
    this.returnFromPreview = false;
  }

  // 保存新增的问卷
  saveQuestionnaire(questionnaire: any): void {
    this.questionnaires.push(questionnaire); // 将问卷添加到数组中
    this.updateLocalStorage(); // 更新 localStorage
  }

  // 获取所有问卷
  getAllQuestionnaires(): any[] {
    return this.questionnaires;
  }

  // 更新 localStorage 中的问卷数据
  updateLocalStorage(): void {
    // 将当前的问卷数据存储到 localStorage，使用 JSON.stringify() 将数组转换为字符串
    localStorage.setItem('questionnaires', JSON.stringify(this.questionnaires));
  }
  // 刪除問卷
  deleteQuestionnaire(position: number): void {
    this.questionnaires = this.questionnaires.filter(q => q.position !== position);
    this.updateLocalStorage();
  }
  clearLocalStorage(): void {
    localStorage.removeItem('questionnaires');  // 清除问卷数据
  }
}

