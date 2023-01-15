import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";
const router = express.Router();
const { newLyric, getAllLyrics, getSingleLyric, updateLyric, deleteLyric } = require("../controller/LyricAssistantController");

router.post("", Authenticate, newLyric);
router.get("/", Authenticate, getAllLyrics);
router.get("/:id", Authenticate, getSingleLyric);
router.put("/:id", Authenticate, updateLyric);
router.delete("/:id", Authenticate, deleteLyric);

export default router;