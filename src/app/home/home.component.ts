import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Task } from '@/models';
import { AuthenticationService, TaskService } from '@/services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUserSubscription: Subscription;
    taskListSubscription: Subscription;
    taskList: Task;
    critical: number;
    //created mock list as the api was not returning the list
    tasks: Task[] = [{
        "id": 607,
        "creator": "0",
        "owner": "39",
        "assignee": "39",
        "parent_id": null,
        "start_dt": "2020-07-29",
        "due_dt": "2020-07-29",
        "reminder_dt": "2020-07-29",
        "status": "Dismissed",
        "attr": {
            "title": "Complete survey for shift 486158",
            "body": "Complete the survey for your shift",
            "label": [
                "survey"
            ],
            "priority": "High",
            "points": 5,
            "type": "survey",
            "shift_id": 486158,
            "survey_completed": 0,
            "system_message": "shift deleted"
        }
    },
    {
        "id": 610,
        "creator": "0",
        "owner": "39",
        "assignee": "39",
        "parent_id": null,
        "start_dt": "2020-07-29",
        "due_dt": "2020-07-29",
        "reminder_dt": "2020-07-29",
        "status": "Pending",
        "attr": {
            "title": "Complete survey for shift 486159",
            "body": "Complete the survey for your shift",
            "label": [
                "survey"
            ],
            "priority": "High",
            "points": 5,
            "type": "survey",
            "shift_id": 486159,
            "survey_completed": 0
        }
    },
    {
        "id": 614,
        "creator": "0",
        "owner": "1333",
        "assignee": "1333",
        "parent_id": null,
        "start_dt": "2020-07-30",
        "due_dt": "2020-07-30",
        "reminder_dt": "2020-07-30",
        "status": "Done",
        "attr": {
            "title": "Check in to shift 486161",
            "body": "Check in to your shift",
            "label": [
                "timekeeping"
            ],
            "priority": "High",
            "points": 5,
            "type": "checkin",
            "shift_id": 486161,
            "rollover": 0
        }
    },
];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private taskService: TaskService
    ) {
        this.taskListSubscription = this.authenticationService.taskList.subscribe(tasks => {
            this.taskList = tasks;
            
        });
    }

    ngOnInit() {
        this.loadAllTasks();
    }

    // ngOnDestroy() {
    //     // unsubscribe to ensure no memory leaks
    //     this.currentUserSubscription.unsubscribe();
    // }

    private loadAllTasks() {
        // this.taskService.getAll().pipe(first()).subscribe(tasks => {
        //     this.tasks = tasks;
        // });
        //used this because api does not return the list
        return this.tasks
        this.criticalCount()
    }
    onClickTask(task) {
        console.log('here method', task)
        this.router.navigate(['/taskdetails', task.id], {
            queryParams: {
                'body': task.attr.body,
                'status': task.status,
                'owner': task.owner,
                'assignee': task.assignee,
                'creator': task.creator,
                'due_dt': task.due_dt
            }
        } );
    }
    criticalCount() {
        for(let i=0;i<= this.tasks.length ; i++) {
            if(this.tasks[i].status == 'Pending') 
                this.critical++;
                console.log(this.critical)
        }
        return this.critical
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}