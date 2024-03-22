import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent {
  constructor(
    private examService: ExamService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  id = this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.getExams();
  }
  userForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    choice1: ['', [Validators.required]],
    choice2: ['', [Validators.required]],
    choice3: [''],
    choice4: [''],
    answer: [[Validators.required]],
    exam: ['', [Validators.required]],
    image: [''],
  });
  files: any;
  images: any[] = [];
  exams: any[] = [];
  handelUpload(event: any) {
    this.files = event.target.files;
    this.images = [];
    for (let file of this.files) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  getExams() {
    this.examService.getExams().subscribe({
      next: (exams: any) => {
        this.exams = exams;
        this.exams = this.exams.filter((exam) => {
          return exam.group === this.id;
        });
      },
    });
  }
  onSubmit(value: any) {
    const data = new FormData();
    data.append('title', value.title);
    data.append('choice1', value.choice1);
    data.append('choice2', value.choice2);
    if (value.choice3) {
      data.append('choice3', value.choice3);
    }
    if (value.choice4) {
      data.append('choice4', value.choice4);
    }
    data.append('answer', value.answer);
    data.append('exam', value.exam);
    if (this.files) {
      data.append('image', this.files[0]);
    }
    this.examService.addQuestion(data).subscribe({
      next: (question: any) => {
        this.router.navigateByUrl('/group/' + this.id);
      },
    });
  }
}
