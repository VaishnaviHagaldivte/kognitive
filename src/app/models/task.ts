export class Task {
    id: number;
    creator: string;
    owner: string;
    assignee: string;
    parent_id: number;
    start_dt: string;
    due_dt: string;
    reminder_dt: string;
    status: string;
    attr: {}
}