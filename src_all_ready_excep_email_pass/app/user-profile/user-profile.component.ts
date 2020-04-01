import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router ,ActivatedRoute} from '@angular/router';

import { MatIconRegistry } from "@angular/material/icon";

import { ToastrService } from 'ngx-toastr';

import { DomSanitizer} from '@angular/platform-browser'

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  toggle: boolean = true;
  user;



  constructor(public auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
     private r:ActivatedRoute,
     private matIconRegistry: MatIconRegistry,
     private domSanitizer: DomSanitizer) { 
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

    googleSignIn(){
    console.log()
    this.auth.googleSignin()
    this.auth.user$.subscribe(user=>{
      
    }) 
  }


  ngOnInit() {
  }

  
  }

