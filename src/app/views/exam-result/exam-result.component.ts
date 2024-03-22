import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css'],
})
export class ExamResultComponent {
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute
  ) {}
  id = this.route.snapshot.params['id'];
  exam: any;
  ngOnInit(): void {
    this.getExam();
    this.getQuestions();
    this.getCountDocuments();
    this.getAnswer()
  }
  getExam() {
    this.examService.getExam(this.id).subscribe({
      next: (exam: any) => {
        this.exam = exam;
      },
    });
  }
  countDocuments: any;
  getCountDocuments() {
    this.examService.getCountDocuments(this.id).subscribe({
      next: (countDocuments: any) => {
        this.countDocuments = countDocuments;
      },
    });
  }
  questions: any[] = [];
  getQuestions() {
    this.examService.getQuestions(this.id).subscribe({
      next: (questions: any) => {
        for (let question of questions) {
          this.examService.getAnswer(question._id).subscribe({
            next: (answer: any) => {
              question.Answer = answer;
            },
            error(err) {
              question.Answer = { answer: 0};
            },
          });
          this.questions.push(question)
        }
      },
    });
  }
  mark = 0;
  getAnswer() {
    this.examService.getMyAnswers(this.id).subscribe({
      next: (answers: any) => {
        console.log(answers);

        for (let answer of answers) {

          if (answer.question.answer == answer.answer) {
            this.mark++;
          }
        }
      },
    });
  }
}
