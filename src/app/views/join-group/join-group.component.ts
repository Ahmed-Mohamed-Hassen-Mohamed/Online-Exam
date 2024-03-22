import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorService } from 'src/app/services/behavior.service';
import { GroupService } from 'src/app/services/group.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css'],
})
export class JoinGroupComponent {
  constructor(
    private groupService: GroupService,
    private behaviorService: BehaviorService,
    private dailog: MatDialog
  ) {}
  onSubmit(data: any) {
    this.groupService.joinGroup(data).subscribe({
      next: (exam: any) => {
        this.behaviorService.updateGroup('false');
      },
      error: (err: any) => {
        if (err.error == 'You are in this group') {
          let dailog = this.dailog.open(DashboardComponent);
          dailog.afterClosed().subscribe((result) => {});
        }
      },
    });
  }
}
function openDailog() {
  throw new Error('Function not implemented.');
}
