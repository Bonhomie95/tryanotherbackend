
import {
  project,
  Editproject
} from "../interfaces/Projectinterface";
import {
  NotFoundError,
} from "../../lib/src/exceptions";
import projectEntity from "../database/entity/Project";
import ProjectBudgetEntity from "../database/entity/ProjectBudget";
import console from "console";
import { ResponseHandler } from "../../lib/src/helpers";
import { NextFunction } from "express";




/*
 * @class projectService
 */
class projectService {
  /**
   * @method create
   * @static
   * @async
   * @param {Request} req
   * @returns {Promise<project>}
   */
  static async create(data: project, id: any): Promise<project> {

    let project = new projectEntity();

    project.name = data.name
    project.description = data.description
    project.artistName = data.artistName
    project.projectType = data.projectType
    project.budget = data.budget
    project.startDate = data.startDate
    project.endDate = data.endDate
    project.organisation = data.organisation
    project.projectMembers = data.projectMembers
    project.progress = "0%"
    project.updatedBy = id

    // console.log(project)
    return project.save()

  }


  /**
   * @method upload
   * @static
   * @async
   * @param {String} id
   * @param {IUpdateOrganization} data
   * @returns {Promise<project>}
   */
  static async upload(
    id: string,
    data: any
  ): Promise<project> {
    const project = await this.getprojectById(id)

    // project.file = data.file
    await projectEntity.update({ id }, data);
    await project.reload();
    return project;
  }

  /**
   * @method getprojects
   * @static
   * @async
   * @param {string}
   * @returns {Promise<project>}
   */
  static async getAllprojects(id: any) {

    const projects = await projectEntity
      .getRepository()
      .createQueryBuilder("project")
      .where("project.updatedBy = :id", { id })
      .getMany()

    if (projects) {
      return projects;
    }

    throw new NotFoundError("No projects found");
  }

  /**
  * @method deleteOneproject
  * @static
  * @async
  * @param {string}
  * @returns {Promise<project>}
  */
  static async deleteOneproject(id: any) {
    const projects = await projectEntity.createQueryBuilder()
      .delete()
      .from(projectEntity)
      .where("id = :id", { id })
      .execute()

    if (projects) {
      return projects;
    }

    throw new NotFoundError("No projects found");
  }


  // /**
  //  * @method getprojects
  //  * @static
  //  * @async
  //  * @param {string}
  //  * @returns {Promise<project>}
  //  */
  // static async getAllproject(): Promise<project[]> {
  //   const projects = await projectEntity.find();
  //   if (projects) {
  //     return projects;
  //   }

  //   throw new NotFoundError("No projects found");
  // }


  /**
   * @method getprojectById
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  static async getprojectById(id: any): Promise<project> {
    let foundproject = await projectEntity
      .getRepository()
      .createQueryBuilder("project")
      .where("project.id = :id", { id })
      .getOne()

    if (foundproject) {
      return foundproject
    }

    throw new NotFoundError("project does not exist!");
  }


  /**
   * @method updateproject
   * @static
   * @async
   * @param {number} id
   * @param {IUpdateOrganization} data
   * @returns {Promise<project>}
   */
  static async updateOrg(
    id: string,
    data: Editproject
  ): Promise<project> {
    const project = await this.getprojectById(id)

    await projectEntity.update({ id }, data);
    await project.reload();
    return project;
  }




  /**
* @method createProjectBudget
* @static
* @async
* @param {number} id
* @param {IUpdateOrganization} data
* @returns {Promise<Task>}
*/

  static async createProjectBudget(id: any, data: any) {
    var totalAvailableBudget = 0
    var totalSpentBudget = 0
    const Project = await projectEntity
      .getRepository()
      .createQueryBuilder("project")
      .where("project.id = :id", { id })
      .getOne()

    if (Project) {

      let ProjectBudget = new ProjectBudgetEntity();
      if (ProjectBudget) {
        ProjectBudget.projectName = Project.name;
        ProjectBudget.clientName = Project.artistName;
        ProjectBudget.budget = data.budget
        ProjectBudget.startDate = data.startDate
        ProjectBudget.endDate = data.endDate
        ProjectBudget.projectId = id

        const length = Object.keys(ProjectBudget.allDetails || {}).length;
        if (length === null || length <= 1) {
          ProjectBudget.budgetBalance = data.budget
          ProjectBudget.budgetSpent = "0"
        }
        else {
          ProjectBudget.allDetails.map((details) => {
            totalAvailableBudget += parseInt(details.available);
            totalSpentBudget += parseInt(details.spent);

            ProjectBudget.budgetBalance = totalAvailableBudget.toString();
            ProjectBudget.budgetSpent = totalSpentBudget.toString();
          })
        }

        return ProjectBudget.save()
      } else {
        console.log("No project found")
      }
    }
  }




  /**
  * @method updateProjectBudget
  * @static
  * @async
  * @param {number} id
  * @param {IUpdateOrganization} data
  * @returns {Promise<Task>}
  */
  static async updateProjectBudget(res: any, id: any, data: any) {
    var totalAvailableBudget = 0
    var totalSpentBudget = 0

    let ProjectBudget = await ProjectBudgetEntity
      .getRepository()
      .createQueryBuilder("projectbudget")
      .where("projectbudget.id = :id", { id })
      .getOne()
    if (ProjectBudget) {

      ProjectBudget.budget = data.budget

      const length = Object.keys(ProjectBudget.allDetails || {}).length;
      if (length === null || length <= 0) {
        ProjectBudget.budgetBalance = data.budget
        ProjectBudget.budgetSpent = "0"
      }
      else {
        ProjectBudget.allDetails.map((details) => {
          totalAvailableBudget += parseInt(details.available)
          totalSpentBudget += parseInt(details.spent)
          console.log(`${totalSpentBudget} + ${totalAvailableBudget}`)
        })

        ProjectBudget.budgetSpent = totalSpentBudget.toString();
        ProjectBudget.budgetBalance = (parseInt(ProjectBudget.budget) - totalSpentBudget).toString();

        return ProjectBudget.save();
      }
    }
    else {
      throw new NotFoundError("No Project budget found");
    }


  }



  /**
  * @method getAllProjectBudget
  * @static
  * @async
  * @param {number} id
  * @param {IUpdateOrganization} data
  * @returns {Promise<Task>}
  */
  static async getAllProjectBudget(id: any) {

    let ProjectBudget = await ProjectBudgetEntity
      .getRepository()
      .createQueryBuilder("projectbudget")
      .where("projectbudget.projectId = :id", { id })
      .getMany()
    if (ProjectBudget) {
      return ProjectBudget;
    }
    else {
      throw new NotFoundError("No Project budget found");

    }
  }



  /**
  * @method updateProjectBudget
  * @static
  * @async
  * @param {number} id
  * @param {IUpdateOrganization} data
  * @returns {Promise<Task>}
  */
  static async updateProjectBudgetDetails(res: any, id: any, data: any) {

    let ProjectBudget = await ProjectBudgetEntity
      .getRepository()
      .createQueryBuilder("projectbudget")
      .where("projectbudget.id = :id", { id })
      .getOne()
    if (ProjectBudget) {
      let budget = parseInt(data.budget);
      let available = parseInt(data.available);
      let spent = parseInt(data.spent);
      if (spent > budget) {
        ResponseHandler.ok(res, undefined, "Spent exceeds budget");
      }
      else {
        if (budget > parseInt(ProjectBudget.budgetBalance)) {
          ResponseHandler.ok(res, undefined, "Budget greater than total available balance");
        }
        // else{
        //   let totalDetailsBudget = 0;
        //   ProjectBudget.allDetails.map((details) => {
        //     totalDetailsBudget += parseInt(details.budget);
        //   })

        // }
        available = budget - spent;
        data.available = available.toString();
        ProjectBudget.allDetails.push(data);
        ProjectBudget.save();
      }
      return ProjectBudget;
    }
    else {
      throw new NotFoundError("No Project budget found");
    }


  }





  /**
  * @method deleteAllProjectBudget
  * @static
  * @async
  * @param {number} id
  * @param {IUpdateOrganization} data
  * @returns {Promise<Task>}
  */
  static async deleteAllProjectBudget(id: any) {

    let ProjectBudget = await ProjectBudgetEntity
      .createQueryBuilder()
      .delete()
      .from(ProjectBudgetEntity)
      .execute()

    if (ProjectBudget) {
      return ProjectBudget;
    }
    else {
      throw new NotFoundError("No Project budget found");
    }


  }





  /**
  * @method deleteProjectBudget
  * @static
  * @async
  * @param {number} id
  * @param {IUpdateOrganization} data
  * @returns {Promise<Task>}
  */
  static async deleteProjectBudget(id: any) {

    let ProjectBudget = await ProjectBudgetEntity
      .createQueryBuilder()
      .delete()
      .from(ProjectBudgetEntity)
      .where("id = :id", { id })
      .execute()

    if (ProjectBudget) {
      return ProjectBudget
    }
    else {
      throw new NotFoundError("No Project budget found");
    }


  }



  /**
  * @method uploadProject
  * @static
  * @async
  * @param {number} id
  * @param {IUpdateOrganization} data
  * @returns {Promise<Task>}
  */
  static async uploadProject(id: any, data: any, next: NextFunction) {

    let uploadProject = await projectEntity
      .getRepository()
      .createQueryBuilder("project")
      .where("project.id = :id", { id })
      .getOne()

    try {
      if (uploadProject) {
        uploadProject.file.push(data);
        uploadProject.save();
        return uploadProject;
      } else {
        throw new NotFoundError("Files failed to upload");
      }
    } catch (error) {
      next(error)
    }

  }
}

export default projectService;
