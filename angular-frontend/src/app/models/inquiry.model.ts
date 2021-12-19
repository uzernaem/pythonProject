import { DataRowOutlet } from "@angular/cdk/table"

export class ToDo {
    inquiry_id?: number
    inquiry_title?: string
    inquiry_text?: string
    inquiry_creator?: number
    inquiry_creator_name?: string
    inquiry_creator_surname?: string
    inquiry_creation_date?: string
    inquiry_is_done?: boolean
    todo_assigned_to?: number
    todo_priority?: string
    todo_status?: string
    todo_category?: string
    todo_priority_name?: string
    todo_status_name?: string
    todo_category_name?: string
}

export class Comment {
    comment_id?: number
    inquiry?: number
    comment_text?: string
    comment_creator?: number
    comment_creation_datetime?: Date
}

export class ToDoCategory {
    category_id?: number
    category_name?: string
}

export class ToDoStatus {
    status_id?: string
    status_name?: string
}