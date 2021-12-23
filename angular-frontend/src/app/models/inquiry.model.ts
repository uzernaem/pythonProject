import { DataRowOutlet } from "@angular/cdk/table"
import { User } from "./user.model"

export class ToDo {
    inquiry_id?: number
    inquiry_title?: string
    inquiry_text?: string
    inquiry_creator?: User
    inquiry_created_at?: string
    inquiry_updated_at?: Date
    inquiry_is_done?: boolean
    todo_assigned_to?: any
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
    comment_creator?: User
    comment_created_at?: Date
}

export class ToDoCategory {
    category_id?: number
    category_name?: string
}

export class ToDoStatus {
    status_id?: string
    status_name?: string
}