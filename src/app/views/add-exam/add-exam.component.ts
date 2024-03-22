import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent {
  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): any {}
  id = this.route.snapshot.params['id'];
  onSubmit(data: any) {
    data.group = this.id;
    this.examService.addExam(data).subscribe({
      next: (exam: any) => {
        this.router.navigateByUrl('/group/' + exam.group);
      },
    });
  }
}
