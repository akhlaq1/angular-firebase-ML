import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { User } from './user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {FirebaseImageService} from './firebase-image.service'



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  user_local;

  userFromFireStore: Observable<User>;

  constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private fimage:FirebaseImageService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          this.fimage.setUserdata(user)

          this.user_local = user;
          //localStorage.setItem('user', JSON.stringify(this.user_local));

          this.userFromFireStore = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          return this.userFromFireStore;

        } else {
          // Logged out
          localStorage.setItem('user', null);
          return of(null);
        }
      })
    );
   }

   

   async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log(credential.user)
    if(credential.user){
      this.router.navigate(['api'])
    }
    return this.updateUserData(credential.user);
  }

  async register(user) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)

    this.signOut()
    return this.updateUserData(result.user,user)
    
}

// async sendEmailVerification() {
//   await this.afAuth.auth.currentUser.sendEmailVerification()
//   this.router.navigate(['admin/verify-email']);
// }

  async loginEmailPass(user) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)

    localStorage.setItem('uid',result.user.uid)

    this.router.navigate(['api']);

    return this.updateUserData(result.user)
}

  private updateUserData(user,local_user=null) {
    // Sets user data to firestore on login
    
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let data;
    if(local_user){
      data = {
        uid: user.uid,
        email: user.email,
        displayName:  local_user.firstName+" "+local_user.lastName ,
        photoURL: user.photoURL
      }
    }
    else{
      data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
    }

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
    localStorage.clear();

  }

  get isLoggedIn(): boolean {
    //const  user  =  localStorage.getItem('user');
    this.user$.subscribe(data => {localStorage.setItem('userData',JSON.stringify(data))})
   
    return  this.user$  !==  null;
}

}