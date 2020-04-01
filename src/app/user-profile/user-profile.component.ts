import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router ,ActivatedRoute} from '@angular/router';

import { MatIconRegistry } from "@angular/material/icon";

import { ToastrService } from 'ngx-toastr';

import { DomSanitizer} from '@angular/platform-browser'

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../shared/must-match.validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  toggle: boolean = true;
  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;
  user;
  error_toggle: boolean;
  errors;



  constructor(public auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
     private r:ActivatedRoute,
     private matIconRegistry: MatIconRegistry,
     private domSanitizer: DomSanitizer,
     private formBuilder: FormBuilder) { 
      this.matIconRegistry.addSvgIcon(
        "logo",
        this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
     }
     toggle_func(){
      if (this.toggle){
        this.toggle = false

      }
      else{
        this.toggle = true

      }
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  
  this.loginForm = this.formBuilder.group({
   
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  
  });
}


get f() { return  this.loginForm.controls;  }
get f_register() { return  this.registerForm.controls;  }



onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    console.log(this.registerForm.value)
    this.auth.register(this.registerForm.value)
      .then(data => {
        alert("SUCCESS!! ")

      })
      .catch(error => {
        this.error_toggle = true
        this.errors = error
        alert(error)
      })
}

onLogInSubmit(){
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
  console.log(this.loginForm.value)
  this.auth.loginEmailPass(this.loginForm.value)
    .then(data => {
      this.router.navigate(['api'])
    })
    .catch(error => alert(error))


}
googleSignIn(){
  this.submitted = false;
  console.log()
  this.auth.googleSignin()
  this.auth.user$.subscribe(user=>{
    
  }) 
}

}
