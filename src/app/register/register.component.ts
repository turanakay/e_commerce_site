import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { ActivatedRoute ,Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  

  constructor(private fb:FormBuilder, private accountService:AccountService,private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email:new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(()=>{
      console.log('sadsadsa')
      this.router.navigateByUrl('/home');
      console.log('nerde')
    },error=>{
      console.log(error);
      console.log(this.registerForm);
    })
  }

  

}
