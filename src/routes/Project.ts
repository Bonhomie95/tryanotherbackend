import express from "express";
import projectController from "../controller/ProjectController";
import Authenticate from "../middlewares/guards/Authenticate";
import projectValidator from "../middlewares/validators/projectValidator";
import budgetValidator from "../middlewares/validators/BudgetValidator";
import taskController from "../controller/TaskController";
import taskValidator from "../middlewares/validators/TaskValidator";
import upload from "../middlewares/multer/multer"
const { createBudgetDetails, updateBudget, getBudget, deleteBudget } = require("../controller/budgetDetailsController")

const router = express.Router();

var limiter = require('express-limiter')(router)


router.put(
  "/:id/upload",
  Authenticate,
  upload.single('file'),
  projectController.uploadProject
)
router.put(
  "/:id/logo",
  Authenticate,
  upload.single('logo'),
  projectController.uploadLogo
)
router.put(
  "/:id/progress",
  Authenticate,
  projectController.updateProgress
)
router.put(
  "/:id",
  Authenticate,
  projectController.updateproject
);

router.post(
  "",
  Authenticate,
  projectValidator.checkCreate(),
  projectController.create
);

router.get(
  "/:id",
  Authenticate,
  projectController.getOneproject
);
router.get(
  "",
  Authenticate,
  projectController.getAllproject
);

router.delete(
  "/:id",
  Authenticate,
  projectController.deleteOneproject
)

router.post(
  "/:id/comment",
  projectValidator.checkCreateComment(),
  projectController.createComment,
)
router.get(
  "/:id/comment",
  projectController.getAllComment,
)
router.delete("/comment/:id/delete", projectController.deleteAnyComment)

router.get(
  "/:id/alltasks",
  Authenticate,
  taskController.getAlltask
);
router.post(
  "/:id/createtask",
  Authenticate,
  taskValidator.checkCreate(),
  taskController.create
);

router.put(
  "/:id/task/:taskid/subtask",
  Authenticate,
  taskController.createSubtask
);

router.delete(
  "/subtask/:id/:name",
  Authenticate,
  taskController.deleteSubTask
);


router.put(
  "/:id/task/:taskid/upload",
  Authenticate,
  upload.single('file'),
  taskController.uploadTask
)

router.get(
  "/:id/getonetask/:taskid",
  Authenticate,
  taskController.getOnetask
);
router.put(
  "/:id/updatetask/:taskid",
  Authenticate,
  taskController.updatetask
);
router.delete(
  "/:id/deletetask",
  Authenticate,
  taskController.deleteTask
);
router.post(
  "/:id/task/:taskid/comment",
  Authenticate,
  taskValidator.checkCreateComment(),
  taskController.createComment,
)

router.get(
  "/:id/task/:taskid/comment",
  Authenticate,
  taskController.getAllComment
)

router.post(
  "/:id/task/:taskid/taskreport",
  Authenticate,
  taskController.createTaskReport,
)

router.get(
  "/:id/task/:taskid/taskreport",
  Authenticate,
  taskController.getAllTaskReport,
)

router.post("/:id/budget/create",
  Authenticate,
  budgetValidator.checkCreateBudget(),
  createBudgetDetails
)

router.get("/:id/budget",
  Authenticate,
  getBudget
)

router.put(
  "/:projectId/budget/:budgetId/update",
  Authenticate,
  budgetValidator.checkCreateBudget(),
  updateBudget
)

router.delete("/:id/budget/:budgetId/delete",
  Authenticate,
  deleteBudget
)
export default router;
