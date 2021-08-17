import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserauthService {
  constructor(private http: HttpClient) {}
  isLoggedIn() {
    if (localStorage.getItem('islogin')) {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('islogin');
  }
}
