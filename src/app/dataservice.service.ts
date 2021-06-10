import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LivingInt } from './components/livingarea/living-int';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  constructor(private http: HttpClient) {}
  getalluser(): Promise<any> {
    return this.http.get(`${environment.base_URL}getalluser`).toPromise();
  }

  getData(): Promise<any> {
    return this.http.get(`${environment.base_URL}users`).toPromise();
  }

  getliving(): Promise<any> {
    return this.http.get(`${environment.base_URL}livingarea`).toPromise();
  }

  getrooms(): Promise<any> {
    return this.http.get(`${environment.base_URL}rooms`).toPromise();
  }

  getlivingbyid(id: number): Promise<any> {
    return this.http
      .get(`${environment.base_URL}getlivingbyid/${id}`)
      .toPromise();
  }
  updatefan(model: any): Observable<any> {
    return this.http.put(`${environment.base_URL}updatefan`, model);
  }
}
