import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";
const router = express.Router();
const { newNote, getAllNotes, getSingleNote, updateNote, deleteNote } = require("../controller/NotesController");

router.post("", Authenticate, newNote);
router.get("/", Authenticate, getAllNotes);
router.get("/:id", Authenticate, getSingleNote);
router.put("/:id", Authenticate, updateNote);
router.delete("/:id", Authenticate, deleteNote);

export default router;