import express from "express";
import UserController from "../controller/UserController";
import userPostController from "../controller/UserPostController";
import Authenticate from "../middlewares/guards/Authenticate";
import UserValidator from "../middlewares/validators/UserValidator";
import upload from "../middlewares/multer/multer"

const router = express.Router();

router.post(
    "",
    UserValidator.checkCreateUser(),
    UserController.createUser
);

router.post(
    "/post",
    Authenticate,
    userPostController.createPost
);

router.put(
    "/me/password",
    Authenticate,
    UserValidator.checkChangePassword(),
    UserController.changePassword
);

router.get(
    "/me",
    Authenticate,
    UserController.getProfile
);

router.get(
    "/post",
    Authenticate,
    userPostController.getAllposts
);
router.get(
    "/post/:id",
    Authenticate,
    userPostController.getpost
);
router.put(
    "/post/like/:id",
    Authenticate,
    userPostController.likepost
);

router.get(
    "/userprojects",
    Authenticate,
    userPostController.getAllUserProjects
);

router.patch(
    "/me",
    Authenticate,
    UserValidator.checkUpdateProfile(),
    UserController.updateProfile
);

router.patch(
    "/me/picture",
    Authenticate,
    upload.single('picture'),
    UserController.updateProfilePicture
);

router.patch(
    "/me/banner",
    Authenticate,
    upload.single('banner'),
    UserController.updateBanner
);

router.delete(
    "/post/:id",
    Authenticate,
    userPostController.deletePost
)

export default router;
