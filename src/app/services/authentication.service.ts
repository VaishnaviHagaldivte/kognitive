import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, Task } from '@/models';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private taskListSubject: BehaviorSubject<Task>;
    public taskList: Observable<Task>;

    constructor(private http: HttpClient) {
        this.taskListSubject = new BehaviorSubject<Task>(JSON.parse(localStorage.getItem('taskList')));
        this.taskList = this.taskListSubject.asObservable();
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string, tenantid: number, id_type: string) {
        var data = "username="+username+"&password="+password+"&grant_type=password"+"&tenantid="+tenantid+"&id_type="+id_type;
        var requestHeader = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded', 'No-Auth':'True', 'Access-Control-Allow-Origin':'*',});
        return this.http.post('https://staging-core-optimy.com/api/v1/login/password',data, {headers: requestHeader});
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}