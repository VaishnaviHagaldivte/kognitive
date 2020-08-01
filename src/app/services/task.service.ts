import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '@/models';

@Injectable({ providedIn: 'root' })
export class TaskService {
    constructor(private http: HttpClient) { }
  
    getAll() {
        return this.http.get<Task[]>('https://staging-core-optimy.com/api/v1/task/list');
    }

    create(task: Task) {
        return this.http.post('https://staging-core-optimy.com/api/v1/task/list', task);
    }

    getById(id: string) {
        return this.http.get(`https://staging-core-optimy.com/api/v1/task/list/${id}`);
    }

    update(task: Task) {
        return this.http.put(`https://staging-core-optimy.com/api/v1/task/list/${task.id}`, task);
    }

    delete(id: number) {
        return this.http.delete(`https://staging-core-optimy.com/api/v1/task/list/${id}`);
    }

}