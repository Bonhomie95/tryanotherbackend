const Post = require("../database/entity/newUserPost")
const Comments = require("../database/entity/newUserComment")




 module.exports.checkIfUserAlreadyLikePost= async (userId:String, postId:String) => {
    const post = await Post.findById(postId).populate("reactions").exec();
   
    if (post) {
      const userAlreadyReactedToPost = post.reactions.find(
        (reaction:any) => reaction.user.id === userId
      );
      
      return userAlreadyReactedToPost;
    }
  }
  


  module.exports.checkIfUserAlreadyLikeComment = async(userId:String, commentId:String) => {
  
    const comment = await Comments.findById(commentId).populate("reactions").exec();

    if (comment) {
      const userAlreadyReactedToComment = comment.reactions.find(
        (reaction:any) => reaction.user.id === userId
      );
      return userAlreadyReactedToComment;
    }
  }