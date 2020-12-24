import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  setUser(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getUser(): string {
    return localStorage.getItem('userId');
  }

  removeUser() {
    localStorage.removeItem('userId');
  }
}
