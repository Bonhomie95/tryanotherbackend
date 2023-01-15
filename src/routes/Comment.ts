import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";
import upload from "../middlewares/multer/multer"
const {createComment, editComment, deleteComment} = require("../controller/userCommentController");
const reactionController = require ("../controller/reactionController")
const {
    authorizeCommentDelete,
    authorizeCommentEdit
  } = require("../middlewares/guards/ActionsAuthorization")
const router = express.Router();


router.post(
    "/:postId/postcomment",
    Authenticate, upload.array('file', 3 ),
    createComment
);

router.get(
  "/:postId/allcomments/:commentId",
  Authenticate,
  createComment
);

router.get(
  "/:postId/singlecomment/:commentId",
  Authenticate,
  createComment
);

router.put(
    "/:postId/editcomment/:commentId", 
    Authenticate,upload.array('file', 3 ),
    editComment
);

router.delete(
    "/:postId/deletecomment/:commentId",
    Authenticate,
    deleteComment
);

router.post(
    "/reaction/:commentId",
    Authenticate,
    reactionController.reactToComment
  );




export default router;