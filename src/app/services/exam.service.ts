import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:8000/';
  addExam(exam: any) {
    return this.http.post(this.url + 'exam', exam);
  }
  startExam(exam: any) {
    return this.http.post(this.url + 'startExam', exam);
  }
  addQuestion(question: any) {
    return this.http.post(this.url + 'question', question);
  }
  addAnswer(answer: any) {
    return this.http.post(this.url + 'answer', answer);
  }
  getExams() {
    return this.http.get(this.url + 'exams');
  }
  getMyExams() {
    return this.http.get(this.url + 'myExams');
  }
  getExamResults(id: any) {
    return this.http.get(this.url + 'examResults/' + id);
  }
  getGroupExams(id: any) {
    return this.http.get(this.url + 'groupExams/' + id);
  }
  getExam(id: any) {
    return this.http.get(this.url + 'exams/' + id);
  }
  getQuestion(id: any) {
    return this.http.get(this.url + 'question/' + id);
  }
  getCountDocuments(id: any) {
    return this.http.get(this.url + 'countDocuments/' + id);
  }
  getAnswer(id: any) {
    return this.http.get(this.url + 'answers/' + id);
  }
  getMyAnswers(id: any) {
    return this.http.get(this.url + 'answersOfExam/' + id);
  }
  getAnswers(exam: any, owner: any) {
    return this.http.get(
      this.url + 'answersOfExam?exam=' + exam + '&owner=' + owner
    );
  }
  getQuestions(id: any) {
    return this.http.get(this.url + 'questionsOfExam/' + id);
  }
  deleteExam(id: any) {
    return this.http.delete(this.url + 'exams/' + id);
  }
}
