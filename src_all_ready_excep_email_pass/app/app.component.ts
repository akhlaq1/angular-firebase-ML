import { Component } from '@angular/core';
import {AuthService} from './auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  constructor(private auth: AuthService){}

  signout_func(){
    this.auth.signOut()
  }

}
