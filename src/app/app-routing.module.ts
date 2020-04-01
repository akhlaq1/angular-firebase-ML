import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UploadImageComponent} from './upload-image/upload-image.component'
import {ListImagesComponent} from './list-images/list-images.component'
import {ApiComponentComponent} from './api-component/api-component.component'

import {AuthGuard} from './auth.guard'

const routes: Routes = [  { path: '', redirectTo: 'login', pathMatch: 'full' },

{ path: 'login', component: UserProfileComponent},
// { path: 'upload', component: UploadImageComponent ,canActivate: [AuthGuard]},
{ path: 'upload', component: UploadImageComponent ,canActivate: [AuthGuard]},
{ path: 'list', component: ListImagesComponent ,canActivate: [AuthGuard]},
{ path: 'api', component: ApiComponentComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
