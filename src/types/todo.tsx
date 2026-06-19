export interface TodoRequest {
    title : string,
    description : string,
    dueDate : string,
    status : string
}

export interface TodoResponse {
    id : number
    title : string,
    description : string,
    dueDate : string,
    status : string
}