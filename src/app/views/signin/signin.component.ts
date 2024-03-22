import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorService } from 'src/app/services/behavior.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  hide= true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private behaviorService: BehaviorService,
    private router: Router,
  ) {}
  image: string = '/assets/image/WhatsApp Image 2022-12-16 at 5.44.43 PM.jpeg';

  ngOnInit(): void {}

  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  onSubmit(data: any) {
    this.login(data);
  }
  img = './assets/images/true.jpg'
  invalidLogin: boolean = false;
  EMLogin?: string;
  login(user: any) {
    this.authService.login(user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.behaviorService.updateData('false');
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        if (err.error) {
          this.invalidLogin = true;
        }
      },
    });
  }
}
