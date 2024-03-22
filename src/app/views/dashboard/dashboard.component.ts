import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';
import { JoinGroupComponent } from '../join-group/join-group.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private dailog: MatDialog, private userService: UserService) {}
  ngOnInit(): void {
    this.getProfile();
  }
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
}
