const Post = require("../database/entity/newUserPost")
const Comments = require("../database/entity/newUserComment")
const Reactions = require("../database/entity/reaction")
const {checkIfUserAlreadyLikePost,checkIfUserAlreadyLikeComment } = require("../helpers/reactionHelper")
import userService from "../services/UserService"
import { ResponseHandler } from "../../lib/src/helpers";
import { NextFunction, Response,Request  } from "express";



/**
 * @class reactionController
 */
 class reactionController {
    /**
     * @method reactToPost
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async reactToPost(req:any, res:Response, next:NextFunction) {

      // get user id from req.user
      const id = req.user.id;
      // get post id from req.params
      const { postId } = req.params;
  
      try {
        // check if user exist to obtain user data from user service
        const user = await userService.checkThatUserExist(id);
  
        const post = await Post.findById(postId).populate("reactions").exec();
        const userId = user.id;
  
        const userAlreadyReactedToPost =
          await checkIfUserAlreadyLikePost(userId, postId);
        if (!userAlreadyReactedToPost) {
          // get post description from req.body
          const { like } = req.body;
          // create user data object
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
  
          //create reaction data object
          const reactionData = {
            reaction: like,
            user: userData,
          };
          const reaction = new Reactions(reactionData);
          post.reactions.push(reaction);
          await reaction.save();
          await post.save();
          return ResponseHandler.created(
            res,
            post,
            "reaction creacted"
          );
        } else {
          // rmove reaction from post if user already reacted
  
          // search for reaction to remove by filtering through existing post
          const postReactionToRemove = post.reactions.find(
            (postReaction:any) => postReaction.user.id === userId
          );
  
          //remove reaction from database
          const removeReaction = await Reactions.findByIdAndRemove(
            postReactionToRemove._id
          );
  
          // remove reaction from associated post
          const userPostReactionIndex = post.reactions.indexOf(userId);
          post.reactions.splice(userPostReactionIndex, 1);
  
          //upate post on db
          await post.save();
          ResponseHandler.ok(res, post, "reaction removed");
        }
      } catch (err) {
        next(err);
      }
    }
  
    /**
     * @method reactToComment
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async reactToComment(req:any, res:Response, next:NextFunction) {
     
      // get user id from req.user
      const id = req.user.id;
      const { commentId } = req.params;
      try {
        // check if user exist to obtain user data from user service
        const user = await userService.checkThatUserExist(id);
  
        const comment = await Comments.findById(commentId).populate("reactions").exec();
        const userId = user.id;
  
        const userAlreadyReactedToComment =
          await checkIfUserAlreadyLikeComment(userId, commentId);
        if (!userAlreadyReactedToComment) {
          // get post description from req.body
          const { like } = req.body;
          // create user data object
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
  
          //create reaction data object
          const reactionData = {
            reaction: like,
            user: userData,
          };
          const reaction = new Reactions(reactionData);
          comment.reactions.push(reaction);
          await reaction.save();
          await comment.save();
          return ResponseHandler.created(
            res,
            comment,
            "reaction creacted"
          );
        } else {
          const commentReactionToRemove = comment.reactions.find(
            (commentReaction:any) => commentReaction.user.id === userId
          );
          const removeReaction = await Reactions.findByIdAndRemove(
            commentReactionToRemove._id
          );
          const userCommentReactionIndex = comment.reactions.indexOf(userId);
          comment.reactions.splice(userCommentReactionIndex, 1);
          await comment.save();
          ResponseHandler.ok(res, comment, "reaction removed");
        }
      } catch (err) {
        next(err);
      }
    }

     
  }
  
  module.exports = reactionController;