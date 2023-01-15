const Post = require("../database/entity/newUserPost")
import userService from "../services/UserService"
import { ResponseHandler } from "../../lib/src/helpers";
import { NextFunction, Response,Request  } from "express";

  //create post
module.exports.createPost = async (req: any, res: Response, next:NextFunction) => {
    const id =req.user.id
   req.files as { [originalname: string]: Express.Multer.File[] };
    
    const uploadedFiles = req.files.map(
        (file:any) => "uploads/" + file.originalname
      );
      
    try {
// check if user exist to obtain user data from user service
       const user = await userService.checkThatUserExist(id);

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

        const postData = {
            description:req.body.description, 
            files: uploadedFiles, 
            user:userData
        }

     const post = new Post(postData)
     await post.save()
      ResponseHandler.created(res, post, "success")
    } catch (error) {
     next(error)
    }
  };

//get posts by user
module.exports.getPostByUser = async (req: any, res: Response, next:NextFunction) => { 
  const { userId } = req.params;
  try {
    const posts = await Post.find({})
      .select("-__v")
      .populate("comments")
      .populate("reactions")
      .exec();

    const filterdPostByUser = posts.filter((post:any) => post.user.id === userId);
    ResponseHandler.ok(res, filterdPostByUser, "success");

  } catch (error) {
   next(error)
  }
}; 


  
//get all post
module.exports.getAllposts = async (req: any, res: Response, next:NextFunction) => { 
  try {
      const posts = await Post.find({})
      .select("-__v")
      .populate("comments")
      .populate("reactions")
      .exec();

    ResponseHandler.ok(res, undefined, posts);
  } catch (error) {
   next(error)
  }
};


//get a post
module.exports.getSinglePost = async (req: any, res: Response, next:NextFunction) => { 
  const{postId} = req.params
  try {
      const post = await Post.findById(postId)
      .select("-__v")
      .populate("comments")
      .populate("reactions")
      .exec();

    ResponseHandler.ok(res,  post, "success");
  } catch (error) {
   next(error)
  }
}; 


  // edit post
  module.exports.editPost = async (req: any, res: Response, next:NextFunction) => {
    const id =req.user.id
    const {postId} = req.params
   req.files as { [originalname: string]: Express.Multer.File[] };
    
    const uploadedFiles = req.files.map(
        (file:any) => "uploads/" + file.originalname
      );
      
    try {
// check if user exist to obtain user data from user service
       const user = await userService.checkThatUserExist(id);

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

        const editPostData = {
            description:req.body.description, 
            files: uploadedFiles, 
            user:userData
        }

     const edittedPost = await Post.findByIdAndUpdate(postId, editPostData)
     await edittedPost.save();
      ResponseHandler.ok(res,  undefined, "post edited successfully")
    } catch (error) {
     next(error)
    }
  };


 // delete post
 module.exports.deletePost = async (req: any, res: Response, next:NextFunction) => { 
    const {postId} = req.params
    try {
        const post = await Post.findByIdAndRemove(postId)
      ResponseHandler.ok(res, undefined, "post deleted successfully");
    } catch (error) {
     next(error)
    }
  };
