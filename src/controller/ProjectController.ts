import UserService from "../services/UserService";
import { NextFunction, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";
import { IUserRequest } from "../../lib/src/interfaces";
import projectService from "../services/ProjectService";
import projectCommentService from "../services/ProjectCommentService"
import project from "../database/entity/Project";
import Task from "../database/entity/Task";


/**
 * @class OrganizationController
 */
class projectController {
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
    const { id } = req.user;
    try {
      const createdOrg = await projectService.create(
        req.body, id
      );
      ResponseHandler.created(res, createdOrg);


    } catch (err) {
      next(err);
    }
  }


  /**
* @method uploadProject
* @static
* @async
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {object}
*/
  static async uploadProject(req: any, res: Response, next: NextFunction) {

    req.file as { [originalname: string]: Express.Multer.File[] };

    const uploadedFiles = req.file.originalname

    const { id } = req.params;
    try {
      const Project = await project.findOneById(id)
      if (Project) {

        const uploadedProject = await projectService.uploadProject(id, uploadedFiles, next);
        ResponseHandler.created(res, uploadedProject);
      }
      else {
        ResponseHandler.ok(res, undefined, "Project not found");
      }
    }
    catch (err) {
      next(err);
    }
  }


  /**
* @method uploadLogo
* @static
* @async
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {object}
*/
  static async uploadLogo(req: any, res: Response, next: NextFunction) {

    req.file as { [originalname: string]: Express.Multer.File[] };

    const uploadedFiles = req.file.originalname
    const { id } = req.params;
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        await project
          .createQueryBuilder()
          .update(project)
          .set({ logo: uploadedFiles })
          .where("id = :id", { id: id })
          .execute()

        ResponseHandler.ok(res, uploadedFiles, "Logo successfully added");


      }
    } catch (err) {
      next(err);
    }
  }

  /**
* @method updateProgress
* @static
* @async
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {object}
*/
  static async updateProgress(req: any, res: Response, next: NextFunction) {
    const { id } = req.params;
    var percentage;
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const allTask = await Task
          .getRepository()
          .createQueryBuilder("task")
          .where("task.project = :id", { id })
          .getMany()

        const totalTask = Object.keys(allTask).length;
        if (totalTask > 0) {
          allTask.map((task) => {
            if (task.status === "COMPLETED" || task.status === "Completed" || task.status === "completed") {
              const completedTask = [];
              completedTask.push(task.status);
              const completedTaskCount = Object.keys(completedTask).length;
              percentage = Math.round((completedTaskCount / totalTask) * 100)
            }
          })

          await project
            .createQueryBuilder()
            .update(project)
            .set({ progress: percentage })
            .where("id = :id", { id })
            .execute()

          ResponseHandler.ok(res, percentage, `Percentage is ${percentage}`);
        }
        else {
          await project
            .createQueryBuilder()
            .update(project)
            .set({ progress: '0' })
            .where("id = :id", { id })
            .execute()


          ResponseHandler.ok(res, undefined, `There is no task`);
        }


      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getAllprojects
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async getAllproject(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.user
    try {
      const getProjects = await projectService.getAllprojects(id);
      if (getProjects) {
        ResponseHandler.ok(res, getProjects);
      }
      else {
        ResponseHandler.ok(res, undefined, "No project for this user")
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method deleteOneproject
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {array}
   */
  static async deleteOneproject(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params
      const getProjects = await projectService.deleteOneproject(id);
      ResponseHandler.ok(res, getProjects, "Deleted Successfully");
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method getOneproject
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async getOneproject(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const getproject = await projectService.getprojectById(req.params.id);
      ResponseHandler.ok(res, getproject);

    } catch (err) {
      next(err);
    }
  }

  /**
   * @method updateproject
   * @static
   * @async
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async updateproject(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const updatedproject = await projectService.updateOrg(
        req.params.id,
        req.body
      );

      ResponseHandler.ok(
        res,
        updatedproject,
        "project updated successfully!"
      );
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

    const { id } = req.params
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const createdOrg = await projectCommentService.create(
          req.body, id
        );
        ResponseHandler.created(res, createdOrg);


      }
    } catch (err) {
      next(err);
    }
  }

  /**
 * @method getOneproject
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
    const { id } = req.params
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const comment = await projectCommentService.getAllComment(id);

        ResponseHandler.ok(res, comment);
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getOneproject
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
    const { id } = req.params
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const comment = await projectCommentService.getCommentById(
          req.params.commentid
        );

        ResponseHandler.ok(res, comment);
      }
    } catch (err) {
      next(err);
    }
  }




  /**
 * @method createProjectBudget
 * @static
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {object}
 */
  static async createProjectBudget(req: IUserRequest, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const createdProjectBudget = await projectService.createProjectBudget(id, req.body);
        ResponseHandler.created(res, createdProjectBudget, "Budget added");
      }
      else {
        ResponseHandler.ok(res, undefined, "No project and/or task found");
      }


    } catch (err) {
      console.log(err);
      next(err);
    }
  }



  /**
 * @method updateProjectBudget
 * @static
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {object}
 */
  static async updateProjectBudget(req: IUserRequest, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const Project = await project.findOneById(id)
      if (Project) {
        const updatedProjectBudget = await projectService.updateProjectBudget(res, id, req.body);
        ResponseHandler.created(res, updatedProjectBudget, "Budget updated");
      }
      else {
        ResponseHandler.ok(res, undefined, "No project and/or task found");
      }


    } catch (err) {
      console.log(err);
      next(err);
    }
  }



  /**
* @method getAllProjectBudget
* @static
* @async
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {object}
*/
  static async getAllProjectBudget(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const Project = await project.findOneById(id)
      if (Project) {
        const createdProjectBudget = await projectService.getAllProjectBudget(id);
        ResponseHandler.ok(res, createdProjectBudget);
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }
    }
    catch (err) {
      next(err);
    }
  }



  /**
* @method updateProjectBudget
* @static
* @async
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {object}
*/
  static async updateProjectBudgetDetails(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, budgetid } = req.params;
      const Project = await project.findOneById(id)
      if (Project) {
        const updatedProjectBudget = await projectService.updateProjectBudgetDetails(res, budgetid, req.body);
        ResponseHandler.ok(res, updatedProjectBudget);
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }
    }
    catch (err) {
      next(err);
    }
  }


  /**
  * @method deleteAllProjectBudget
  * @static
  * @async
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {object}
  */
  static async deleteAllProjectBudget(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const Project = await project.findOneById(id)
      if (Project) {
        const deletedProjectBudget = await projectService.deleteAllProjectBudget(id);
        ResponseHandler.ok(res, deletedProjectBudget, "Deleted Successfully");
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }
    }
    catch (err) {
      next(err);
    }
  }

  /**
  * @method deleteProjectBudget
  * @static
  * @async
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {object}
  */
  static async deleteProjectBudget(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, budgetid } = req.params;
      const Project = await project.findOneById(id)
      if (Project) {
        const deletedProjectBudget = await projectService.deleteProjectBudget(budgetid);
        ResponseHandler.ok(res, deletedProjectBudget, "Deleted Successfully");
      }
      else {
        ResponseHandler.ok(res, undefined, "No project found");
      }
    }
    catch (err) {
      next(err);
    }
  }

  /**
  * @method getOneproject
  * @static
  * @async
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {object}
  */
  static async deleteAnyComment(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params
    try {
      const deletedComment = projectCommentService.deleteProjectComment(id)
      ResponseHandler.ok(res, undefined, "comment deleted successfully success");
    } catch (err) {
      next(err);
    }
  }


}

export default projectController;
