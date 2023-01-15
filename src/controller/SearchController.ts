import {Request, Response, NextFunction} from "express"
import { ResponseHandler } from "../../lib/src/helpers";
import SearchService from "../services/SearchService";



/**
 * @class searchController
 */
class searchController {
  /**
   * @method search
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
  static async search(req: any, res: Response, next: NextFunction) {
    const {searchData} = req.body
    try {
     const searchResult = await SearchService.search(searchData)

     if(searchResult){
        ResponseHandler.ok(res, searchResult, "success")
     }
    } catch (err) {
      next(err);
    }
  }


  /**
   * @method searchTaks
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {object}
   */
   static async searchTasks(req: any, res: Response, next: NextFunction) {
    const {projectId} = req.params
    const {searchData} = req.body
    try {
     const searchResult = await SearchService.searchTasks(projectId, searchData)

     if(searchResult){
        ResponseHandler.ok(res, searchResult, "success")
     }
    } catch (err) {
      next(err);
    }
  }    
  
}





export default searchController;
