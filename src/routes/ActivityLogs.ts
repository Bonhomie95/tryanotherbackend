import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";
const {getActivityLogs, deleteOneActivityLog, clearLogs} = require("../controller/ActivityLogs")
const { checkPremiumPlan} = require("../middlewares/guards/checkUserPlans")



const router = express.Router();

router.get(
    "",
    Authenticate, 
    // checkPremiumPlan,
    getActivityLogs
);

router.delete("/:id/delete", Authenticate, 
// checkPremiumPlan, 
deleteOneActivityLog)

router.delete("/clearlogs", Authenticate, 
// checkPremiumPlan, 
clearLogs)

export default router
