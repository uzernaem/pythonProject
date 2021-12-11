export class Inquiry {
    inquiry_id?: number
    inquiry_title?: string
    inquiry_text?: string
    inquiry_creator?: number
    inquiry_creation_date?: string
    inquiry_is_done?: boolean
    todo_priority?: string
    todo_assigned_to?: number
    todo_status?: string
    todo_category?: string
}

export class ToDoCategory {
    category_id?: number
    category_name?: string
}