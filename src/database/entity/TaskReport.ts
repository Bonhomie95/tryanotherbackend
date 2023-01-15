import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import  Task from "./Task"
@Entity("tbl_task_report")

class TaskReport extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({type:"text", nullable: false})
    public name!: string;

    @Column({type:"text", nullable: false})
    public number!: string;

    @Column ({type:"text", nullable: false})
    public text!: string;

    @Column ({type:"simple-array", nullable: false, default:[]})
    public members!: string[];
    
    @Column({type:"text", nullable: false,  default: "Submitted"})
    public status!: string;

    @OneToMany(() => TaskReport, (task_report) => task_report.parentId, { nullable: true, createForeignKeyConstraints: false })
    replys!: TaskReport[];

   @ManyToOne(() => TaskReport, (task_report) => task_report.replys, { nullable: true, createForeignKeyConstraints: false })
   parentId!: TaskReport;
    
    
    @ManyToOne(() => Task, task => task.comment,{cascade: ["insert", "update"],})
    task!: Task;

    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default TaskReport;

