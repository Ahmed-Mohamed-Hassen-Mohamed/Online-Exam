import { Component } from '@angular/core';
import { AddGroupComponent } from '../add-group/add-group.component';
import { MatDialog } from '@angular/material/dialog';
import { JoinGroupComponent } from '../join-group/join-group.component';
import { GroupService } from 'src/app/services/group.service';
import { BehaviorService } from 'src/app/services/behavior.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private groupService: GroupService,
    private behaviorService: BehaviorService,
    private dailog: MatDialog
  ) {
    this.behaviorService.group$.subscribe((value) => {
      this.getGroups();
    });
  }
  ngOnInit(): void {
    this.getGroups();
  }
  groups: any[] = [];
  getGroups() {
    this.groupService.getGroups().subscribe({
      next: (groups: any) => {
        this.groups = groups;
      },
    });
  }
}
