import express from 'express';
import {
  createNote,
  getNotes,
  getOneNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

export const noteRouter = express.Router();

noteRouter.route('/')
  .post(createNote)
  .get(getNotes)

noteRouter.route('/:noteId')
  .get(getOneNote)
  .put(updateNote)
  .delete(deleteNote)
