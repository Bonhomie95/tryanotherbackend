const Comments = require("../database/entity/newUserComment")
const Post = require("../database/entity/newUserPost")
import userService from "../services/UserService"
import { ResponseHandler } from "../../lib/src/helpers";
import { NextFunction, Response,Request  } from "express";



  //create comment
module.exports.createComment = async (req: any, res: Response, next:NextFunction) => {
    const {postId} = req.params
  
    const id =req.user.id
   req.files as { [originalname: string]: Express.Multer.File[] };
    
    const uploadedFiles = req.files.map(
        (file:any) => "uploads/" + file.originalname
      );
      
    try {
// check if user exist to obtain user data from user service
       const user = await userService.checkThatUserExist(id);
       const post = await Post.findById(postId)

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

        const commentData = {
            text:req.body.text, 
            files: uploadedFiles, 
            user:userData
        }
    
        const comment = new Comments(commentData)
        await comment.save()
        post.comments.push(comment)
        await post.save()
    
      ResponseHandler.created(res, post, "success")
    } catch (error) {
     next(error)
    }
  };


   //edit comment
module.exports.editComment = async (req: any, res: Response, next:NextFunction) => {
    const {postId, commentId} = req.params
    const id =req.user.id
   req.files as { [originalname: string]: Express.Multer.File[] };
    
    const uploadedFiles = req.files.map(
        (file:any) => "uploads/" + file.originalname
      );
      
    try {
// check if user exist to obtain user data from user service
       const user = await userService.checkThatUserExist(id);
       const post = await Post.findById(postId)

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

        const commentData = {
            text:req.body.text, 
            files: uploadedFiles, 
            user:userData
        }

        const edittedComment = await Comments.findByIdAndUpdate(commentId, commentData)
        await edittedComment.save()
        // update comment on post
        let commentUpdateOnPost = post.comments[commentId];
        commentUpdateOnPost = commentData;
        await post.save();
        
      ResponseHandler.created(res, undefined, "Comment edited successfully")
    } catch (error) {
     next(error)
    }
  };
  

 // delete post
 module.exports.deleteComment = async (req: any, res: Response, next:NextFunction) => { 
    const {postId, commentId} = req.params
    try {
        const comment = await Comments.findByIdAndRemove(commentId)
        const post = await Post.findById(postId)

         // delete comment from associated post
      const postCommentIndex = post.comments.indexOf(commentId);

      post.comments.splice(postCommentIndex, 1);
      await post.save();
      ResponseHandler.ok(res, undefined, "comment deleted succesfully");

    } catch (error) {
     next(error)
    }
  };


