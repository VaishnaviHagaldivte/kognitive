import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@/services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = {
            'token': 'r0MrA268ORAobX53qkoaohaA7g9ek3JJ'
        }
        if (currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `${currentUser.token}`
                }
            });
        }
        else {
            request = request.clone({
                setHeaders: { 
                    'Content-Type': 'application/json',
                }
            });
        }


        return next.handle(request);
    }
}