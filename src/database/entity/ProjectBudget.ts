import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import Project from "./Project"
@Entity("tbl_project_budgets")

class ProjectBudget extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false })
    public projectName!: string;

    @Column({ nullable: false })
    public clientName!: string;

    @Column({ nullable: false })
    public budget!: string;

    @Column({ nullable: false })
    public budgetBalance!: string;

    @Column({ nullable: false })
    public budgetSpent!: string;

    @Column({ type: 'jsonb', nullable: true, array: true })
    public allDetails!: {budget: string, available:string, spent:string}[];

    @Column({ nullable: false })
    public startDate!: Date;

    
    @Column({ nullable: false })
    public endDate!: Date;

    @ManyToOne(() => Project, (project) => project.id, { nullable: true, createForeignKeyConstraints: false })
    projectId!: Project;

}

export default ProjectBudget;

