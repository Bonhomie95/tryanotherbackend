
import { NextFunction, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";
import { IUserRequest } from "../../lib/src/interfaces";
import taskService from "../services/TaskService";
import project from "../database/entity/Project";
import Task from "../database/entity/Task";
import TaskService from "../services/TaskService";




// const scheduleReminderEmail = async (id: any) => {
//   try {
// const task = await Task.findOne({ where: { id }});
// const testMode = true;
// const reminder_date = testMode
// ? new Date(Date.now() + 10000) // Sends reminder email every 1 minute
// : task?.endDate;


// const job:any = schedule.scheduleJob(
//   task?.title as string,
//   reminder_date as Date,
//   async () => {
//     const flash = await Task.findOne({ where: { id }});
//     if (!flash) return schedule.cancelJob(job);

//     const mailTitle = ``;
//     const mailBody = ``;

//     const user = "";

//     await sendEmail(user, mailTitle, mailBody);

//   task?.endDate = ""

//   if (!testMode) { 
//     await Task.save();
//   }
// },
// async () => {
//   const task = await Task.findOne({ where: { id }});
//   if (!task) return schedule.cancelJob(job);

//   schedule.cancelJob(job);
//   await scheduleReminderEmail(id);
// }
// }) 
//   } catch (error) {
//     console.log(error);
//   }
// }


/**
 * @class OrganizationController
 */
class taskController {
  /**
   * @method create
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async create(req: IUserRequest, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const createdOrg = await taskService.create(
          req.body, id
        );
        ResponseHandler.created(res, createdOrg);
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }


    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getAlltasks
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getAlltask(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params
      const Project = await project.findOneById(id)
      if (Project) {
        const getTasks = await taskService.getAllTasks(id);
        ResponseHandler.ok(res, getTasks);
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getOnetask
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async getOnetask(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const { id } = req.params
      const Project = await project.findOneById(id)
      if (Project) {
        const gettask = await taskService.getTaskById(
          req.params.taskid
        );

        ResponseHandler.ok(res, gettask);
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }


    } catch (err) {
      next(err);
    }
  }

  /**
   * @method updatetask
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async updatetask(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const Project = await project.findOneById(id)
      if (Project) {
        const updatedtask = await taskService.updateOrg(
          req.params.taskid,
          req.body
        );

        ResponseHandler.ok(
          res,
          updatedtask,
          "task updated successfully!"
        );
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
  * @method create
  * @static
  * @async
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {object}
  */
  static async createComment(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const createdOrg = await taskService.createComment(
        req.body,
        req.params.taskid
      );
      ResponseHandler.created(res, createdOrg);


    } catch (err) {
      next(err);
    }
  }

  /**
* @method getAllComment
* @static
* @async
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {object}
*/
  static async getAllComment(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const Project = await project.findOneById(id)
      if (Project) {
        const comment = await taskService.getAllComment(req.params.taskid);

        ResponseHandler.ok(res, comment);
      }
    } catch (err) {
      next(err);
    }
  }


  /**
   * @method getOneComment
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async getCommentById(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const comment = await taskService.getCommentById(
        req.params.id
      );

      ResponseHandler.ok(res, comment);
    } catch (err) {
      next(err);
    }
  }

  /**
 * @method createSubtask
 * @static
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {object}
 */
  static async createSubtask(req: IUserRequest, res: Response, next: NextFunction) {
    const { id, taskid } = req.params
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const createdSubtask = await taskService.createSubtask(taskid, req.body);
        ResponseHandler.created(res, createdSubtask, "Subtask added");
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }


    } catch (err) {
      next(err);
    }
  }


  /**
* @method uploadTask
* @static
* @async
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {object}
*/
  static async uploadTask(req: any, res: Response, next: NextFunction) {

    req.file as { [originalname: string]: Express.Multer.File[] };

    const uploadedFiles = req.file.originalname
    const { id, taskid } = req.params;
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const createdSubtask = await taskService.uploadTask(taskid, uploadedFiles);
        ResponseHandler.created(res, createdSubtask, "File uploaded successfully");
      }
      else {
        ResponseHandler.ok(res, undefined, "Project not found");
      }
    } catch (err) {
      next(err);
    }
  }

 /**
   * @method updatetask
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async deleteTask(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try{
      const {id} = req.params
      const taskToDelete = await Task.findOne({where:{id}})
      await taskToDelete?.remove()
      ResponseHandler.ok(res, undefined, "task deleted successfully")
    }catch(error){

    }
  }


  /**
 * @method deleteSubTask
 * @static
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {object}
 */
   static async deleteSubTask(req: any, res: Response, next: NextFunction) {
    const { id, name } = req.params
    try {
      const deleteSubTask = await TaskService.deleteSubTask(id, name)
      if (deleteSubTask) {

        ResponseHandler.ok(res, undefined, "subtask removed");
      }
      
    } catch (err) {
      next(err);
    }
  }


  /**
   * @method createTaskReport
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async createTaskReport(req: IUserRequest, res: Response, next: NextFunction) {
    const { id, taskid } = req.params
    try {
      const Project = await project.findOneById(id)
      const task = await Task.findOneById(taskid)
      if (Project && task) {
        const createdTaskReport = await taskService.createTaskReport(
          taskid, req.body
        );
        ResponseHandler.ok(res, createdTaskReport, "Report added");
      }
      else {
        ResponseHandler.ok(res, undefined, "No project and/or task found");
      }


    } catch (err) {
      next(err);
    }
  }

  /**
* @method getAllTaskReport
* @static
* @async
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {object}
*/
  static async getAllTaskReport(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, taskid } = req.params;
      const Project = await project.findOneById(id)
      const task = await Task.findOneById(taskid)
      if (Project && task) {
        const createdTaskReport = await taskService.getAllTaskReport(taskid);
        ResponseHandler.ok(res, createdTaskReport);
      }
      else {
        ResponseHandler.ok(res, undefined, "No project and/or task found");
      }
    }
    catch (err) {
      next(err);
    }
  }



}






export default taskController;
