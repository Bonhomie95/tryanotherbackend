import OrganizationService from "./OrganizationService";
import projectService from "./ProjectService";
import TaskService from "./TaskService";
import UserService from "./UserService";

/**
 * @class SearchService
 */
class SearchService {
  /**
   * @method search
   * @static
   * @async
   * @param {string} searchData
   * @returns {Promise<SearchResult>}
   */
  static async search(
    searchData: string,
  ) {

    const organizations = await OrganizationService.getAllOrganizations()
    const projects = await projectService.getAllprojects(searchData)
    const users = await UserService.getAllUsers()

    const allData = [...organizations, ...projects, ...[users]]

    const searchResult = await allData.filter((data: any) => data.includes(searchData))

    return searchResult
  }

  /**
   * @method searchTasks
   * @static
   * @async
   * @param {string} searchData
   * @returns {Promise<SearchResult>}
   */
  static async searchTasks(
    searchData: string,
    projectId: string
  ) {

    const taskData = await TaskService.getAllTasks(projectId)

    if (taskData) {
      const searchResult = await taskData.filter((data: any) => data.includes(searchData))
      return searchResult
    }

  }

}

export default SearchService;
