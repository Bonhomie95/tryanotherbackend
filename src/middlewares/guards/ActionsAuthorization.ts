import { Request, Response, NextFunction } from "express";
const {
    UnauthorizedError,
  } = require("../../../lib/src/exceptions/UnauthorizedError");
  const Post = require("../../database/entity/newUserPost");
  const Comments = require("../../database/entity/newUserComment");

  /**
   * @function authorizePostDelete
   * @description Middleware to perform authentication in API routes
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  exports.authorizePostDelete = async (req:any, res:Response, next:NextFunction) => {
    const userId = req.user.id;
    const { postId } = req.params;
    try {
      if (req.user) {
        const post = await Post.findOne({ _id: postId });
        if (post.user.id === userId) {
          next();
        } else {
          throw new UnauthorizedError("unathorized action");
        }
      }
    } catch (err) {
      next(err);
    }
  };
  
  /**
   * @function authorizePostEdit
   * @description Middleware to perform authentication in API routes
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   */
   module.exports.authorizePostEdit = async (req:any, res:Response, next:NextFunction) => {
    const userId = req.user.id;
    const { postId } = req.params;
    try {
      if (req.user) {
        const post = await Post.findOne({ _id: postId });
        if (post.user.id === userId) {
          next();
        } else {
          throw new UnauthorizedError(`unauthorized action`);
        }
      }
    } catch (err) {
      next(err);
    }
  };
  
  /**
   * @function authorizeCommentDelete
   * @description Middleware to perform authentication in API routes
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   */
   module.exports.authorizeCommentDelete = async (req:any, res:Response, next:NextFunction) => {
    const userId = req.user.id;
    const { commentId } = req.params;
    try {
      if (req.user) {
        const comment = await Comments.findOne({ _id: commentId });
        if (comment.user.id === userId) {
          next();
        } else {
          throw new UnauthorizedError(`unauthorized action`);
        }
      }
    } catch (err) {
      next(err);
    }
  };
  
  /**
   * @function authorizeCommentEdit
   * @description Middleware to perform authentication in API routes
   * @param {IUserRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   */
   module.exports.authorizeCommentEdit = async (req:any, res:Response, next:NextFunction) => {
    const userId = req.user.id;
    const { commentId } = req.params;
    try {
      if (req.user) {
        const comment = await Comments.findOne({ _id: commentId });
        if (comment.user.id === userId) {
          next();
        } else {
          throw new UnauthorizedError(`unauthorized action`);
        }
      }
    } catch (err) {
      next(err);
    }
  };
  

  