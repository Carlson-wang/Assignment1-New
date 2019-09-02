import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { User } from '../models/user';
// import { User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName: string;

  loading = false;
  submitted = false;
  isLogin = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.userName = user.username;
      this.isLogin = true;
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const formObj  = this.loginForm.controls;
    this.authService.login(formObj.username.value, formObj.password.value)
    .subscribe(
      data => {
        console.log('success login');
        console.log({ data });
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.isLogin = true;
        this.loading = false;
        if (formObj.username.value === 'super'){
          this.router.navigate(['/manage/user']);
        }else{
          this.router.navigate(['/']);
        }

      },
      error =>{
        console.error(error);
        this.loading = false;
      });
    
  }
  logout(): void{
    sessionStorage.removeItem('currentUser');
    this.isLogin = false;
    this.router.navigate(['/']);
  }

}
