import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomMaterialModule } from './core/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ListImagesComponent } from './list-images/list-images.component';
import { ApiComponentComponent } from './api-component/api-component.component';

import {HttpClientModule} from '@angular/common/http'

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import {FormsModule} from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import {MatIconModule} from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';


// Firebase config

const config = {
  apiKey: "AIzaSyBUiyeRA34zb435kpZALSIRD9TdLB4N7I8",
  authDomain: "angular-ml-chen.firebaseapp.com",
  databaseURL: "https://angular-ml-chen.firebaseio.com",
  projectId: "angular-ml-chen",
  storageBucket: "angular-ml-chen.appspot.com",
  messagingSenderId: "766726268244",
  appId: "1:766726268244:web:120cbcc0fb85f9f3fdd4c1",
  measurementId: "G-4R2DF3XPBF"
}


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UploadImageComponent,
    ListImagesComponent,
    ApiComponentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    CustomMaterialModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatIconModule,
    ReactiveFormsModule,
    
    LightBoxModule, CarouselModule, ModalModule, WavesModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
