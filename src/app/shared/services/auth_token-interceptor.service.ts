import { HttpEvent, HttpHandler,HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UserInfoService } from "./user-info.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor{
    constructor(private authService:UserInfoService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.authData.pipe(take(1),exhaustMap((user)=>{
            if (!user || !user.token) {
                // If no user or token available, proceed with the original request
                return next.handle(req);
            }
          const modifiedReq = req.clone({
            setHeaders: {
                Auth_token: `${user.token}`
            }

          });
            return next.handle(modifiedReq)
        }))      
    }
}