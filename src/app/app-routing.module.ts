import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { AddExamComponent } from './views/add-exam/add-exam.component';
import { AddQuestionComponent } from './views/add-question/add-question.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ExamComponent } from './views/exam/exam.component';
import { ExamResultComponent } from './views/exam-result/exam-result.component';
import { GroupComponent } from './views/group/group.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ResultsComponent } from './views/results/results.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'addExam/:id',
    component: AddExamComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'addQuestion/:id',
    component: AddQuestionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'exam/:id',
    component: ExamComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'examResult/:id',
    component: ExamResultComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'group/:id',
    component: GroupComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'examresults/:id',
    component: ResultsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
