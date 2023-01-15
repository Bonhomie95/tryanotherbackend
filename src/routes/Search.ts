import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";
import searchController from "../controller/SearchController";


const router = express.Router();


router.get(
  "",
  Authenticate,
  searchController.search
);


router.get(
    "/tasks/:projectId",
    Authenticate,
    searchController. searchTasks
  );
  

export default router;
