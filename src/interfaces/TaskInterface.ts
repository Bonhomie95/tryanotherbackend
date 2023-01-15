/**
 * @interface Task
 */
import Project from "../database/entity/Project";
 export interface Task{
     id?: string;
     title: string;
     description: string;
     startDate: Date;
     endDate: Date;
     taskMembers: string[];
     budget: string;
     createdAt: Date;
     reload: any;
     status: string;
     subtask?:object[];
     

}

export interface EditTask {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    projectMembers?: string[];
    Status: string;
}


export interface CreateSubTask {
    subtask?: object[];
}
