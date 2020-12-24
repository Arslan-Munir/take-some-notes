import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user.model';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import performance from 'firebase';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private storageService: StorageService) {
  }

  isUserLoggedIn(): boolean {
    const userId = this.storageService.getUser();
    return !!userId;
  }

  logIn(user: User): Promise<UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user: User): Promise<UserCredential> {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logOut(): Promise<void>{
    return this.fireAuth.signOut();
  }
}
