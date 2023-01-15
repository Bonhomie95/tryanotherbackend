
import {
  Task,
  EditTask
} from "../interfaces/TaskInterface";
import {
  TaskComment
} from "../interfaces/Commentinterface";
import {
  NotFoundError,
} from "../../lib/src/exceptions";
import TaskEntity from "../database/entity/Task";
import TaskCommentEntity from "../database/entity/TaskComment";
import TaskReportEntity from "../database/entity/TaskReport";





/*
 * @class TaskService
 */
class TaskService {
  /**
   * @method create
   * @static
   * @async
   * @returns {Promise<Task>}
   */
  static async create(
    data: Task, id: any
  ): Promise<Task> {


    let Task = new TaskEntity();

    Task.title = data.title
    Task.description = data.description
    Task.startDate = data.startDate
    Task.endDate = data.endDate
    Task.project = id
    Task.budget = data.budget
    Task.taskMembers = data.taskMembers
    Task.status = data.status

    //console.log(Task)
    return Task.save()

  }

  /**
   * @method getTasks
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<Task>}
   */
  static async getAllTasks(id: any): Promise<Task[]> {
    const tasks = await TaskEntity
      .getRepository()
      .createQueryBuilder("task")
      .where("task.projectId = :id", { id })
      .getMany()
    if (tasks) {
      return tasks;
    }

    throw new NotFoundError("No Tasks found");
  }

  /**
   * @method getTaskById
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  static async getTaskById(id: any): Promise<Task> {
    let foundTask = await TaskEntity.findOne({ relations: ["comment"], where: { id } });


    if (foundTask) {

      return foundTask
    }

    throw new NotFoundError("Task does not exist!");
  }


  /**
   * @method updateTask
   * @static
   * @async
   * @param {number} id
   * @param {IUpdateOrganization} data
   * @returns {Promise<Task>}
   */
  static async updateOrg(
    id: string,
    data: EditTask
  ): Promise<Task> {
    const Task = await this.getTaskById(id)

    await TaskEntity.update({ id }, data);
    await Task.reload();
    return Task;
  }

  /**
  * @method create
  * @static
  * @async
  * @returns {Promise<comment>}
  */
  static async createComment(
    data: TaskComment,
    id: any
  ): Promise<TaskComment> {
    if (data.parentId) {
      data.origin = false
    }

    let comment = new TaskCommentEntity();

    comment.name = data.name
    comment.text = data.text
    comment.task = data.task
    comment.parentId = data.parentId
    comment.origin = data.origin
    comment.task = id

    return comment.save()
  }

  /**
  * @method getAllComment
  * @static
  * @param {String} id
  * @async
  */
  static async getAllComment(id: string) {

    const foundAllcomment = await TaskCommentEntity
      .getRepository()
      .createQueryBuilder("taskcomment")
      .where("taskcomment.task = :id", { id })
      .getMany()

    if (foundAllcomment) {
      return foundAllcomment;
    }
    throw new NotFoundError("comment does not exist!");
  }

  /**
   * @method getCommentById
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  static async getCommentById(id: string): Promise<TaskComment> {
    const foundcomment = await TaskCommentEntity.findOne({ where: { id }, relations: ["replys"] });
    if (foundcomment) {
      return foundcomment;
    }
    throw new NotFoundError("comment does not exist!");
  }


  /**
   * @method createSubtask
   * @static
   * @async
   * @param {number} id
   * @param {IUpdateOrganization} data
   * @returns {Promise<Task>}
   */
  static async createSubtask(id: string, data: any) {
    const Task = await TaskEntity
      .getRepository()
      .createQueryBuilder()
      .where("id = :id", { id })
      .getOne()

    if (Task) {
      Task.subtask.push(data);
      Task.save();
      return Task;
    }
    throw new NotFoundError("Task does not exist!");

  }

  /**
 * @method createTaskReport
 * @static
 * @async
 * @param {number} id
 * @param {IUpdateOrganization} data
 * @returns {Promise<Task>}
 */
  static async createTaskReport(
    id: any,
    data: any
  ) {

    let TaskReport = new TaskReportEntity();

    TaskReport.name = data.name
    TaskReport.number = data.number
    TaskReport.text = data.text
    TaskReport.members = data.members
    TaskReport.task = id


    //console.log(Task)
    return TaskReport.save()

  }

  /**
* @method getAllTaskReport
* @static
* @async
* @param {number} id
* @param {IUpdateOrganization} data
* @returns {Promise<Task>}
*/
  static async getAllTaskReport(id: any) {

    let TaskReport = await TaskReportEntity
      .getRepository()
      .createQueryBuilder("taskreport")
      .where("taskreport.taskId = :id", { id })
      .getMany()
    if (TaskReport) {
      return TaskReport;
    }

    throw new NotFoundError("No Task report found");


  }


  /**
   * @method uploadTask
   * @static
   * @async
   * @returns {Promise<Task>}
   */
  static async uploadTask(id: any, data: any) {
    let taskUpload = await TaskEntity
      .getRepository()
      .createQueryBuilder("task")
      .where("task.id = :id", { id })
      .getOne()

    if (taskUpload) {
      taskUpload.attachment.push(data);
      taskUpload.save();
      return taskUpload;
    }
    else {
      throw new NotFoundError("Files failed to upload");
    }
  }

  /**
   * @method getCommentById
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  static async deleteSubTask(id: string, name: string): Promise<TaskComment> {
    const foundTask = await TaskEntity.findOne({ where: { id }, relations: ["subTask"] });
    if (foundTask) {
      const subTask = foundTask.subtask.find((tsk) => tsk.name === name) || { name: "", status: "" }
      const taskToRemoveIndex = foundTask.subtask.indexOf(subTask)
      foundTask.subtask.splice(taskToRemoveIndex, 1)
      foundTask.save()
    }
    throw new NotFoundError("comment does not exist!");
  }
}

export default TaskService;
