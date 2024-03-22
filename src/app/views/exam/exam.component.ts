import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent {
  constructor(
    private examService: ExamService,
    // private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getExam();
    this.getQuestion();
    this.getCountDocuments();
  }
  id = this.route.snapshot.params['id'];
  exam: any;
  question: any = {};
  choices: any[] = [];
  answer = 0;
  seconds = 1000;
  RTime: any;
  time = 0;
  getExam() {
    this.examService.getExam(this.id).subscribe({
      next: (exam: any) => {
        this.exam = exam;
        this.examService.startExam({ exam: this.id }).subscribe({
          next: (exam: any) => {
            const dateObject = new Date(exam.startExam);
            const seconds = dateObject.getTime();
            this.RTime =
              this.exam.examTime * 60 * 1000 - (Date.now() - seconds);
            const intervalId = () => {
              console.log('finished!');
              this.time = 1;
              this.router.navigateByUrl('examResult/' + this.id);
            };
            const timeoutId = setTimeout(
              intervalId,
              this.exam.examTime * 60 * 1000 - (Date.now() - seconds)
            );
            const intervalTime = () => {
              if (!this.time) {
                this.seconds += 1000;
                setTimeout(intervalTime, 1000);
              }
            };
            const timeout = setTimeout(intervalTime, 0);
          },
        });
      },
    });
  }
  floor(x: any, y: any) {
    return Math.floor(x / y);
  }
  countDocuments: any;
  getCountDocuments() {
    this.examService.getCountDocuments(this.id).subscribe({
      next: (countDocuments: any) => {
        this.countDocuments = countDocuments;
        if (countDocuments.countQuestions == countDocuments.countAnswers) {
          this.time = 1;
          this.router.navigateByUrl('examResult/' + this.id);
        }
      },
    });
  }
  getQuestion() {
    this.examService.getQuestion(this.id).subscribe({
      next: (question: any) => {
        this.question = question;
        this.choices = [question.choice1, question.choice2];
        if (question.choice3) {
          this.choices.push(question.choice3);
        }
        if (question.choice4) {
          this.choices.push(question.choice4);
        }
      },
    });
  }
  Choice(value: any) {
    this.answer = value;
  }
  MakeAnswer() {
    this.examService
      .addAnswer({
        answer: this.answer,
        exam: this.id,
        question: this.question._id,
      })
      .subscribe({
        next: (answer: any) => {
          this.answer = 0;
          this.getQuestion();
          this.getCountDocuments();
        },
      });
  }
}
