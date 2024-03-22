import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorService } from 'src/app/services/behavior.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
})
export class AddGroupComponent {
  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private behaviorService: BehaviorService,
    private dailog: MatDialog
  ) {}
  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    image: ['', [Validators.required]],
  });
  files: any;
  images: any[] = [];
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
  onSubmit(value: any) {
    const data = new FormData();
    data.append('name', value.name);
    data.append('image', this.files[0]);
    this.groupService.addGroup(data).subscribe({
      next: (res: any) => {
      },
    });
  }
}
