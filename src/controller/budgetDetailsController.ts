import {Request, Response, NextFunction} from "express"
import UserService from "../services/UserService"
import projectService from "../services/ProjectService"
import { ConflictError } from "../../lib/src/exceptions"
import { ResponseHandler } from "../../lib/src/helpers"
const BudgetDetails = require("../database/entity/BudgetDetails")
const {
        getTotalOfAlreadyCreatedBudgetDetails, 
        getTotalOfAlreadySpentBudget, 
        getNewValueForProjectBudget,
        getNewValueForProjectSpentBudget
        } = require("../services/BudgetDetailsService")



 module.exports.createBudgetDetails = async (req:any, res: Response, next: NextFunction) => {
        const { id } = req.params
        const userId = req.user.id
        const {newBudget, newSpentBudget, budgetDescription, budgetTitle} = req.body 
     
    try {
      const totalCreatedBudget = await getTotalOfAlreadyCreatedBudgetDetails(id)
     
      const totalSpentBudget = await getTotalOfAlreadySpentBudget(id)
     
      const projectToAddBudget = await projectService.getprojectById(id)
             
      const user = await UserService.checkThatUserExist(userId)

      const availableBudget = newBudget - newSpentBudget
      
      if(projectToAddBudget){
        const maximumBudgetForProject = +projectToAddBudget.budget

        if(totalCreatedBudget + newBudget > maximumBudgetForProject){
          throw new ConflictError(`you cannot exceed your set budget of ${maximumBudgetForProject}`)
        }

        if(newSpentBudget > newBudget  ) {
          throw new ConflictError(`your spending limit cannot exceed ${newBudget}`)
        }

        if(totalSpentBudget !==0 && totalSpentBudget + newSpentBudget > totalCreatedBudget){
          throw new ConflictError(`you spending cannot exceed your set budget of ${maximumBudgetForProject}`)
        }

        if(totalSpentBudget > totalCreatedBudget){
          throw new ConflictError(`your spent budget cannot exceed your total created budget of ${totalCreatedBudget}`)
        }


        const budgetDetailsData = {
          title: budgetTitle, 
          description: budgetDescription, 
          budget: newBudget,
          spentBudget: newSpentBudget,
          availableBudget,
          project:{
            id:projectToAddBudget.id, 
            name: projectToAddBudget.name, 
            description: projectToAddBudget.description, 
            artistName: projectToAddBudget.artistName,
            projectType: projectToAddBudget.projectType
          }, 
          user:{
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }
        }
        const newBudgetDetails = new BudgetDetails(budgetDetailsData)
        await newBudgetDetails.save()
        ResponseHandler.created(res, newBudgetDetails, "new budget created");
      }
    
      } catch (err) {
      next(err);
    }
  }


  
 module.exports.updateBudget = async (req: any, res: Response, next: NextFunction) =>  {
    const { projectId, budgetId } = req.params
    const userId = req.user.id
    const {newBudget, newSpentBudget, budgetDescription, budgetTitle} = req.body 
    try {
      const totalOfCalulcatedBudget = await getNewValueForProjectBudget(projectId, budgetId, newBudget)
      const totalOfCalculatedSpentBudget = await getNewValueForProjectSpentBudget(projectId, budgetId, newSpentBudget)
      const projectToAddBudget = await projectService.getprojectById(projectId)
        
      const user = await UserService.checkThatUserExist(userId)
      
      const availableBudget = newBudget - newSpentBudget

      if(projectToAddBudget){
        const maximumBudgetForProject = +projectToAddBudget.budget
        
        if(totalOfCalulcatedBudget  > maximumBudgetForProject){
          throw new ConflictError(`you cannot exceed your set budget of ${maximumBudgetForProject}`)
        }

        if(totalOfCalculatedSpentBudget > maximumBudgetForProject){
            throw new ConflictError(`your speding cannot exceed your budget limit of ${maximumBudgetForProject}`)
        }

        if(newSpentBudget > newBudget ) {
          throw new ConflictError(`your spending limit canoot exceed ${newBudget}`)
        }

        if(totalOfCalculatedSpentBudget > totalOfCalulcatedBudget){
          throw new ConflictError(`your total spent budget cannot exceed the total created budget of ${totalOfCalulcatedBudget}`)
        }

        const newBudgetDetailsData = {
          title: budgetTitle, 
          description: budgetDescription, 
          budget: newBudget,
          spentBudget: newSpentBudget,
          availableBudget,
          project:{
            id:projectToAddBudget.id, 
            name: projectToAddBudget.name, 
            description: projectToAddBudget.description, 
            artistName: projectToAddBudget.artistName,
            projectType: projectToAddBudget.projectType
          }, 
          user:{
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }
        }
    
        const updatedBudget = await BudgetDetails.findByIdAndUpdate(budgetId, newBudgetDetailsData)
    
        if(updatedBudget){
        ResponseHandler.ok(res, newBudgetDetailsData, "budget updated")
       }
      }
    
      } catch (err) {
      next(err);
    }
  }

     module.exports.getBudget = async(req: any, res: Response, next: NextFunction) => {
        const {id} = req.params
        try {
          const project = await projectService.getprojectById(id)
          const budgets = await BudgetDetails.find({})
          
          const budgetForProject = budgets.filter((budget:any) => budget.project.id === id)
          
          ResponseHandler.ok(res, budgetForProject, "bugdet updated");
        
          } catch (err) {
          next(err);
        }
      }


       module.exports.deleteBudget = async(req: any, res: Response,next: NextFunction) => {
          const {budgetId} = req.params
          try {
            const budgetToDelete = await BudgetDetails.findByIdAndRemove(budgetId)   
            ResponseHandler.created(res, undefined, "budget deleted sucessfully");
          
            } catch (err) {
            next(err);
          }
        }