import express from "express";
import OrganizationController from "../controller/OrganizationController";
// import UserController from "../controller/UserController";
import Authenticate from "../middlewares/guards/Authenticate";
import OrganizationValidator from "../middlewares/validators/OrganizationValidator";
// import UserValidator from "../middlewares/validators/UserValidator";

const router = express.Router();

router.get(
    "",
    Authenticate,
    OrganizationController.getAllOrganization
);
router.post(
    "/create",
    Authenticate,
    OrganizationValidator.checkCreate(),
    OrganizationController.create
);
router.get(
    "/:id",
    Authenticate,
    OrganizationController.getOneOrganization
);
router.patch(
    "/:id",
    Authenticate,
    OrganizationController.updateOrganization
);
router.put(
    "/:id/members",
    Authenticate,
    OrganizationController.updateOrganizationMembers
);
router.delete(
    "/:id/members/:memberid",
    Authenticate,
    OrganizationController.updateOrganizationMembers
);
router.delete(
    "/:id",
    Authenticate,
    OrganizationController.deleteAllOrganizationMembers
);

router.delete("/delete/:id", Authenticate, OrganizationController.deleteOrganization)



export default router;
