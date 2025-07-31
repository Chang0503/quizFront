export interface QuestionAnswerVo {
  quesId: number;
  answerList: string[];
  question: string;
}

export interface FeedbackVo {
  userName: string;
  phone: string;
  email: string;
  age: number;
  fillinDate: string;
  answerVoList: QuestionAnswerVo[];
}

export interface FeedbackRes {
  code: number;
  message: string;
  title: string;
  direction: string;
  feedbackVoList: FeedbackVo[];
}
