import Organization from "../database/entity/Organization";

/**
 * @interface Project
 */
export interface project {
    reload?: any;
    id?: string;
    name: string;
    description: string;
    artistName: string;
    projectType: string;
    budget: string;
    startDate: Date;
    endDate: Date;
    projectMembers: string[];
    createdAt: Date;
    organisation: Organization;
    comment?: any
    updatedBy: string;
    file: string[];


}

export interface Editproject {
    name?: string;
    description?: string;
    artistName?: string;
    projectType?: string;
    startDate?: Date;
    endDate?: Date;
    projectMembers?: string[];
    organisation?: any;
    privacy?: string;
}
