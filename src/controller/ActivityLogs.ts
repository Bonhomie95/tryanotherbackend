import {Request, Response, NextFunction} from "express"
const ActivityLogs = require("../database/entity/ActivityLogs")
import userService from "../services/UserService"
import ResponseHandler from "../../lib/src/helpers/ResponseHandler"
import NotFoundError from "../../lib/src/exceptions/NotFoundError"
import UserService from "../services/UserService"


// timeline line post activity logs 
module.exports.postCreatedLog = async (userId:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

        const logData = {
            title:"created a new post", 
            description: "You created a new post", 
            user: userData
          }
        const logs = new ActivityLogs(logData)
        await logs.save()
        console.log(logs)
        return logs
    }catch(error){
        return error
    }
}

module.exports.postDeletedLog = async (userId:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

          const logData = {
            title:"post deleted", 
            description: "you deleted a post", 
            user: userData
          }
  
        const logs = new ActivityLogs(logData)
        await logs.save()
        console.log(logs)
        return logs
    }catch(error){
        return error
    }
}

  module.exports.postEdittedLog = async (userId:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"editted a post", 
                description: "you eddited a post", 
                user: userData
            }
        const logs = new ActivityLogs(logData)
        await logs.save()
        console.log(logs)
        return logs
    }catch(error){
        return error
    }
}

module.exports.createPostCommentLog = async (userId:string, firstName:string, lastName:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"posted a comment", 
                description: `you posted a comment on a post by ${firstName} ${lastName}`, 
                user: userData
            }
        const logs = new ActivityLogs(logData)
        await logs.save()
        console.log(logs)
        return logs
    }catch(error){
        return error
    }
}

module.exports.editPostCommentLog = async (userId:string, firstName:string, lastName:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"editted a comment", 
                description: `you eddited a comment on a post by ${firstName} ${lastName}`, 
                user: userData
            }
        const logs = new ActivityLogs(logData)
        await logs.save()
        console.log(logs)
        return logs
    }catch(error){
        return error
    }
}

module.exports.deletePostCommentLog = async (userId:string, firstName:string, lastName:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"deleted a comment", 
                description: `you deleted your comment on a post by ${firstName} ${lastName}`, 
                user: userData
            }
        const logs = new ActivityLogs(logData)
        await logs.save()
        console.log(logs)
        return logs
    }catch(error){
        return error
    }
}

module.exports.reactionToPostAndCommentLog = async (userId:string, activity:string, reaction:string, firstName:string, lastName:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:`reaction to ${activity}  `, 
                description: `you ${reaction}d to a ${activity} by ${firstName} ${lastName} `, 
                user: userData
            }
        const logs = new ActivityLogs(logData)
        await logs.save()
        console.log(logs)
        return logs
    }catch(error){
        return error
    }
}


module.exports.deleteReactionToPostAndCommentLog = async (userId:string, activity:string, reaction:string, firstName:string, lastName:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:`unreacted to ${activity}  `, 
                description: `you un${reaction}d a ${activity} by ${firstName} ${lastName} `, 
                user: userData
            }
        const logs = new ActivityLogs(logData)
        await logs.save()
        console.log(logs)
        return logs
    }catch(error){
        return error
    }
}

// end of post activity logs


// payment activity logs
module.exports.createPaymentLog = async(userId:string, plan:string) => {
    try {
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"Payment made", 
                description: `You made payment for ${plan} plan`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs

    }catch(error){
        return error
    }

}

//end of payment activity log 


// project activity logs
module.exports.createProjectActivityLog = async(userId:string, title:string) => {
    try {
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"Project Created", 
                description: `You created a new project with title: ${title}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs

    }catch(error){
        return error
    }

}

module.exports.uploadProjectActivityLog = async(userId:string, name:string) => {
    try {
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"Project Uploaded", 
                description: `You uploaded file to a with name: ${name}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs

    }catch(error){
        return error
    }
}

module.exports.uploadLogotoProjectActivityLog = async(userId:string, name:string) => {
    try {
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"Project Logo Uploaded", 
                description: `You uploaded logo to a with name: ${name}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs

    }catch(error){
        return error
    }
}


module.exports.deleteAllProjectActivityLog = async(userId:string) => {
    try {
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"Projects Deleted", 
                description: `You deleted All projects created`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs

    }catch(error){
        return error
    }
}


module.exports.deleteOneProjectActivityLog = async(userId:string, name:string) => {
    try {
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"A project Deleted", 
                description: `You deleted a project with name: ${name}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs

    }catch(error){
        return error
    }
}


module.exports.updateProjectActivityLog = async(userId:string, name:string) => {
    try {
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"updated a project", 
                description: `You updated a project with name: ${name}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs

    }catch(error){
        return error
    }
}

//end of project logs

//Organiztion activity logs

module.exports.createOrganizationActivityLog = async(userId:string, name:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"created an organization", 
                description: `You created an organization with name: ${name}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs
    }catch(error){
        return error
    }
}


module.exports.updateOrganizationActivityLog = async(userId:string, name:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"updated an organization", 
                description: `You updated an organization with name: ${name}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs
    }catch(error){
        return error
    }
}

module.exports.deleteOrganizationActivityLog = async(userId:string, name:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"deleted an organization", 
                description: `You updated an organization with name: ${name}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs
    }catch(error){
        return error
    }
}


//end or organization activity logs

module.exports.createTaskActivityLog = async(userId:string, name:string, projectName:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"created a task", 
                description: `You added a task with name: ${name} to project with name:${projectName}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            console.log(logs)
            return logs
    }catch(error){

    }
}

module.exports.updateTaskActivityLog = async(userId:string, name:string, projectName:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"updated a task", 
                description: `You updated a task with name: ${name} to project with name:${projectName}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            return logs
    }catch(error){

    }
}

module.exports.deleteTaskActivityLog = async(userId:string, name:string) => {
    try{
        const user = await userService.checkThatUserExist(userId)
        const userData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            role: user.role,
            isVerified: user.isVerified,
            isActive: user.isActive,
          };

            const logData = {
                title:"deleted a task", 
                description: `You deleted a task with name: ${name}`, 
                user: userData
            }

            const logs = new ActivityLogs(logData)
            await logs.save()
            return logs
    }catch(error){

    }
}

module.exports.getActivityLogs = async (req:any, res:Response, next:NextFunction) => {
    const userId = req.user.id
    try{
        const logs = await ActivityLogs.find({})
       if(!logs || logs.length === 0){
        throw new NotFoundError("no logs found")
       } 
       const userActivityLogs = logs.filter((log:any) => log.user.id === userId)
       return ResponseHandler.ok(res, userActivityLogs, "success")
    }catch(error){
        next(error)
    }
}

module.exports.deleteOneActivityLog = async(req:any, res:Response, next:NextFunction) => {
    const {id} = req.params
    console.log(id)
    try{
        const deletedLog = await ActivityLogs.findByIdAndRemove(id)
        ResponseHandler.ok(res, undefined, "log delted successfully")
    }catch(error){
        next(error)
    }
}


module.exports.clearLogs = async(req:any, res:Response, next:NextFunction) => {
    const userId = req.user.id
    try{
    let logs = await ActivityLogs.find({})
    const userActivityLogs = logs.filter((log:any) => log.user.id === userId)
    const logIds = userActivityLogs.map((log:any) => log._id )
    if(logIds || logIds.length > 0){
        const deleteLogs = await ActivityLogs.deleteMany({_id: {$in: logIds}})
        ResponseHandler.ok(res, undefined, "logs cleared")
    }
    }catch(error){
        next(error)
    }
    
}
