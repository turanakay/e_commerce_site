import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute ,Router } from "@angular/router"; //to route after successfull login
import { AccountService } from '../account/account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private accountService: AccountService, private router: Router, private activadeRoute: ActivatedRoute, ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl('/home');
    }, (error) => {
      console.log(error);
    }
    );
  }


}