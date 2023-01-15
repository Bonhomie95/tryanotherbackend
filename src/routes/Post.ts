import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";
import upload from "../middlewares/multer/multer"
const { createPost, editPost, deletePost, getAllposts, getSinglePost } = require("../controller/newUserPostController");
const { checkPremiumPlan, } = require("../middlewares/guards/checkUserPlans")
const reactionController = require("../controller/reactionController")
const {
    authorizePostDelete,
    authorizePostEdit,
} = require("../middlewares/guards/ActionsAuthorization")
const router = express.Router();



router.post(
    "/", Authenticate, upload.array('file', 10),
    createPost
);

router.get(
    "/",
    Authenticate,
    getAllposts
);

router.get(
    "/:postId",
    Authenticate,
    getSinglePost
);

router.put(
    "/:postId",
    Authenticate, upload.array('file', 10),
    editPost
);
router.delete(
    "/:postId",
    Authenticate,
    deletePost
);
router.post(
    "/reaction/:postId",
    Authenticate,
    reactionController.reactToPost
    );



export default router;
