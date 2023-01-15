
import {
  Comment,
} from "../interfaces/index";

import {
  NotFoundError,
} from "../../lib/src/exceptions";
import CommentEntity from "../database/entity/comment";

/**
 * @class commentService
 */
class commentService {
  /**
   * @method create
   * @static
   * @async
   * @returns {Promise<comment>}
   */
  static async create(
    data: Comment,
    id: any
  ): Promise<Comment> {
    if (data.parentId) {
      data.origin = false
    }

    let comment = new CommentEntity();

    comment.name = data.name
    comment.text = data.text
    comment.parentId = data.parentId
    comment.origin = data.origin
    comment.project = id

    return comment.save()
  }

  /**
   * @method getCommentById
   * @static
   * @async
   * @param {string} name
   * @returns {Promise<void>}
   */
  static async getCommentById(id: string): Promise<Comment> {
    const foundcomment = await CommentEntity.findOne({ where: { id }, relations: ["reply"] });
    if (foundcomment) {
      return foundcomment;
    }
    throw new NotFoundError("comment does not exist!");
  }

  /**
   * @method getAllComment
   * @static
   * @async
   * @returns {Promise<void>}
   */
  static async getAllComment(id: string) {
    const foundAllcomment = await CommentEntity
      .getRepository()
      .createQueryBuilder("comment")
      .where("comment.project = :id", { id })
      .getMany()
      
    if (foundAllcomment) {
      return foundAllcomment;
    }
    throw new NotFoundError("comment does not exist!");
  }


     /**
   * @method deleteComment
   * @static
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
      static async deleteProjectComment(id: string): Promise<Comment> {
        const foundcomment = await CommentEntity.findOne({ where: { id }});
        if (foundcomment) {
          await foundcomment.remove();
          return foundcomment;
        }
        throw new NotFoundError("comment does not exist!");
      }
}

export default commentService;
