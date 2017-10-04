import { Injectable, VERSION } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class VersionInterceptorService implements HttpInterceptor {
  
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req.clone({
            setHeaders: { 'X-Frontend-By': `angular ${VERSION.full}` }
        });
        return next.handle(newReq);
    }
}