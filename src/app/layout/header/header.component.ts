import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorService } from 'src/app/services/behavior.service';
import { UserService } from 'src/app/services/user.service';
import { AddGroupComponent } from 'src/app/views/add-group/add-group.component';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';
import { JoinGroupComponent } from 'src/app/views/join-group/join-group.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private dailog: MatDialog,
    private behaviorService: BehaviorService,
    private userService: UserService
  ) {
    this.behaviorService.data$.subscribe((value) => {
      this.token = localStorage.getItem('token');
      this.getProfile();
    });
  }
  img = './assets/images/true.jpg'
  token: any;
  ngOnInit(): void {}
  addGroup() {
    let dailog = this.dailog.open(AddGroupComponent);
    dailog.afterClosed().subscribe((result) => {});
  }
  joinGroup() {
    let dailog = this.dailog.open(JoinGroupComponent);
    dailog.afterClosed().subscribe((result) => {});
  }
  user: any;
  getProfile() {
    this.userService.getProfile().subscribe({
      next: (user: any) => {
        this.user = user;
      },
    });
  }
  openDailog() {
    let dailog = this.dailog.open(DashboardComponent);
    dailog.afterClosed().subscribe((result) => {});
  }
  logOut() {
    localStorage.removeItem('token');
    this.behaviorService.updateData('false');
  }
}
