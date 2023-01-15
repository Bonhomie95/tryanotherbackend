import express from "express";
const router = express.Router();
import Authenticate from "../middlewares/guards/Authenticate";
const { newCave, getCave, updateCave, deleteCaveFile, deleteCaveFolder } = require("../controller/CaveController");
import upload from "../middlewares/multer/multer"


router.post("", Authenticate,upload.single("file"), newCave);
router.get("/", Authenticate, getCave);
router.put("/", Authenticate,upload.single("file"), updateCave);
router.delete("/:id/file/:fileid", deleteCaveFile);
router.delete("/folder/:id", deleteCaveFolder);

export default router;