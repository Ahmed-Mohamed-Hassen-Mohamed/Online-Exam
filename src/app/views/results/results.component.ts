import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute
  ) {}
  id = this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.getExamResults();
    this.getExam();
  }
  exam:any
  getExam() {
    this.examService.getExam(this.id).subscribe({
      next: (exam: any) => {
        this.exam = exam;
      },
    });
  }
  results: any[] = [];
  getExamResults() {
    this.examService.getExamResults(this.id).subscribe({
      next: (results: any) => {
        for (let result of results) {
          let myPromise = new Promise(async (resolve, reject) => {
            this.examService
              .getAnswers(result.exam, result.owner._id)
              .subscribe({
                next: (answers: any) => {
                  let mark = 0;
                  for (let answer of answers) {
                    if (answer.question.answer == answer.answer) {
                      mark++;
                    }
                  }
                  resolve(mark);
                },
              });
          });
          myPromise.then(async (mark: any) => {
            this.examService.getCountDocuments(result.exam).subscribe({
              next: (countDocuments: any) => {
                result.mark = (mark / countDocuments.countQuestions).toFixed(2);
              },
            });
          });
          this.results.push(result);
        }
      },
    });
  }
}
