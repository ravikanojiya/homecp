import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserauthService } from './userauth.service';

@Injectable({
  providedIn: 'root',
})
export class UserauthguardGuard implements CanActivate {
  constructor(private authservice: UserauthService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // const url: string = state.url;
    return this.checkLogin(state.url);
  }
  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   return this.canActivate(route, state);
  // }
  checkLogin(url:any): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.isLoggedIn()) {
      return true;
    }
    // this.service.redirectUrl = url;
    this.route.navigate(["/auth"], { queryParams: { returnUrl: url } });
    return false;
  }
}
