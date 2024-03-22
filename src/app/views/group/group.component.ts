import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { QrcodeComponent } from '../qrcode/qrcode.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent {
  constructor(
    private groupService: GroupService,
    private examService: ExamService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dailog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.getGroup();
    this.getExams();
    this.getProfile();
    this.getMembers();
  }
  id = this.route.snapshot.params['id'];
  group: any;
  exams: any;
  getGroup() {
    this.groupService.getGroup(this.id).subscribe({
      next: (group: any) => {
        this.group = group;
      },
    });
  }
  getExams() {
    this.examService.getGroupExams(this.id).subscribe({
      next: (exams: any) => {
        this.exams = exams;
      },
    });
  }
  members: any[]=[];
  getMembers() {
    this.groupService.getMembers(this.id).subscribe({
      next: (members: any) => {
        this.members = members;
      },
    });
  }
  user:any;
  getProfile() {
    this.userService.getProfile().subscribe({
      next: (user: any) => {
        this.user = user;
      },
    });
  }
  openDailog() {
    let dailog = this.dailog.open(QrcodeComponent, {data: { id: this.id }});
    dailog.afterClosed().subscribe((result) => {});
  }
}
