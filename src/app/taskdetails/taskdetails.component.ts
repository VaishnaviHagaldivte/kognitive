import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskDetails } from '@/models';
import { AuthenticationService, TaskService } from '@/services';

@Component({ templateUrl: 'taskdetails.component.html' })
export class TaskDetailsComponent implements OnInit, OnDestroy {
    id: any;
    data: any;
    taskDetailSubscription: Subscription;
    taskListSubscription: Subscription;
    taskDetails: TaskDetails;
    show: boolean;
    //created mock list as the api was not returning the list

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private taskService: TaskService
    ) {}


    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.taskDetailSubscription.unsubscribe();
    }
    
    ngOnInit() {
        // this.data = this.route.snapshot.params['data']
         this.data = {
            id: this.route.snapshot.params['id'],
            body: this.route.snapshot.queryParams['body'],
            status: this.route.snapshot.queryParams['status'],
            owner: this.route.snapshot.queryParams['owner'],
            assignee: this.route.snapshot.queryParams['assignee'],
            creator: this.route.snapshot.queryParams['creator'],
            due_dt: this.route.snapshot.queryParams['due_dt']
        }
        console.log(this.data)
        this.getDetails();
        this.taskDetailSubscription = this.route.paramMap.subscribe(params => {

        })
        
    } 
    getDetails() {
        this.taskService.getById(this.id).subscribe(data =>{
            console.log(data)
        })
    }

    gotoHome() {
        this.router.navigate(['/home']);
    }
    
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}