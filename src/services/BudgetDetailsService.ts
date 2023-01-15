const BudgetDetails = require("../database/entity/BudgetDetails")
import UserService from "./UserService"
import projectService from "./ProjectService"
import { NotFoundError, ServerError } from "../../lib/src/exceptions"


module.exports.getTotalOfAlreadyCreatedBudgetDetails = async(projectId:string) => {
    try{
        const budgetDetails = await BudgetDetails.find({})
       
        let totalBudgetCreated
        if(budgetDetails || budgetDetails.length > 0){
            const budgetsDetailsForProject = budgetDetails.filter((details:any) => details.project.id === projectId)
            const amountOfBudget = budgetsDetailsForProject.map((budget:any) => budget.budget)
        
            if(!budgetsDetailsForProject || budgetsDetailsForProject.length === 0){
                return totalBudgetCreated = 0
           }
      
        totalBudgetCreated = amountOfBudget.reduce((sum:any, number:any) => {
            return sum + number
        }, 0)
      
        return totalBudgetCreated
        }
    }catch(error){
        throw new ServerError(`${error}`)
    }
}

module.exports.getTotalOfAlreadySpentBudget= async(projectId:string) => {
    try{
        const budgetDetails = await BudgetDetails.find({})
        let totalBudgetSpent
        if(budgetDetails || budgetDetails.length > 0){
            const budgetsDetailsForProject = budgetDetails.filter((details:any) => details.project.id === projectId)
            if(!budgetsDetailsForProject || budgetsDetailsForProject){
                
                return totalBudgetSpent = 0  
            }

            const valueOfSpentBudget = budgetsDetailsForProject.map((budget:any) => budget.spentBudget)
            totalBudgetSpent = valueOfSpentBudget.reduce((sum:any, number:any) => {
                return sum + number
            }, 0)

            return totalBudgetSpent
        }
    }catch(error){
        throw new ServerError(`${error}`)
    }
}


module.exports.getNewValueForProjectBudget= async(projectId:string, budgetId:string, newBudgetAmount:number) => {
    try{
        const budgetDetails = await BudgetDetails.find()
        const budgetsForProject = budgetDetails.filter((budget:any) => budget.project.id === projectId)
        const indexOfBudgetToUpdate = budgetsForProject.findIndex((budget:any) => budget._id == budgetId)
        budgetsForProject[indexOfBudgetToUpdate].budget = newBudgetAmount

        const valueOfAllBudget = budgetsForProject.map((budget:any) => budget.budget)
        const newTotalValue = valueOfAllBudget.reduce((sum:any, number:any) => {
            return sum + number
        }, 0)

            return newTotalValue
        
    }catch(error){
        throw new ServerError(`${error}`)
    }
}

module.exports.getNewValueForProjectSpentBudget= async(projectId:string, budgetId:string, newSpentBudgetAmount:number) => {
    try{
        const budgetDetails = await BudgetDetails.find()
        const budgetsForProject = budgetDetails.filter((budget:any) => budget.project.id === projectId)
        const indexOfBudgetToUpdate = budgetsForProject.findIndex((budget:any) => budget._id == budgetId)
        budgetsForProject[indexOfBudgetToUpdate].spentBudget = newSpentBudgetAmount

        const valueOfAllSpentBudget = budgetsForProject.map((budget:any) => budget.spentBudget)
        const newTotalValue = valueOfAllSpentBudget.reduce((sum:any, number:any) => {
            return sum + number
        }, 0)

            return newTotalValue
        
    }catch(error){
        throw new ServerError(`${error}`)
    }
}