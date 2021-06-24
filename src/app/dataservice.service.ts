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
  getUser(id): Observable<any> {
    return this.http.get(`${environment.base_URL}api/user/${id}`);
  }
  getAptTypes(): Observable<any> {
    return this.http.get(`${environment.base_URL}api/apttype`);
  }
  getapt(): Observable<any> {
    return this.http.get(`${environment.base_URL}api/apartment/`);
  }
  getaptbyuid(model): Observable<any> {
    return this.http.patch(`${environment.base_URL}api/apartment/user`, model);
  }
  getaptbyid(id): Observable<any> {
    return this.http.get(`${environment.base_URL}api/apartment/${id}`);
  }
  getroombyaptid(id): Observable<any> {
    return this.http.get(`${environment.base_URL}api/room/apt/${id}`);
  }
  getdevbyid(roomid): Observable<any> {
    return this.http.get(`${environment.base_URL}api/device/${roomid}`);
  }
  updatefan(model: any): Observable<any> {
    return this.http.patch(
      `${environment.base_URL}api/device/updateOnOff`,
      model
    );
  }
  getdevicebyroomid(roomid): Observable<any> {
    return this.http.get(`${environment.base_URL}api/device/room/${roomid}`);
  }
  updatefandim(model): Observable<any> {
    return this.http.patch(
      `${environment.base_URL}api/device/updatedim`,
      model
    );
  }
  getUserlogin(model): Observable<any> {
    return this.http.post(`${environment.base_URL}api/auth/user/login`, model);
  }
  updateOnOffstatus(model): Observable<any> {
    return this.http.patch(
      `${environment.base_URL}api/device/update/attribute`,
      model
    );
  }
  // getalluser(): Promise<any> {
  //   return this.http.get(`${environment.base_URL}getalluser`).toPromise();
  // }

  // getData(): Promise<any> {
  //   return this.http.get(`${environment.base_URL}users`).toPromise();
  // }

  // getliving(): Promise<any> {
  //   return this.http.get(`${environment.base_URL}livingarea`).toPromise();
  // }

  // getrooms(): Promise<any> {
  //   return this.http.get(`${environment.base_URL}rooms`).toPromise();
  // }

  // getlivingbyid(id: number): Promise<any> {
  //   return this.http
  //     .get(`${environment.base_URL}getlivingbyid/${id}`)
  //     .toPromise();
  // }
  // updatefan(model: any): Observable<any> {
  //   return this.http.put(`${environment.base_URL}updatefan`, model);
  // }
}
