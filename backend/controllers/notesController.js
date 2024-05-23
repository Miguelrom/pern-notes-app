import validator from "validator";
import { Note } from "../models/Note.js";

export const createNote = async (req, res) => {

  let { title, description, isActive } = req.body;

  const errorResponse = {
    message: 'Incorrect fields validation error',
    errors: []
  };

  if (typeof title === 'string' && title !== '') {

    title = title.trim();
    
  } else {

    errorResponse.errors.push({
      message: 'Field title must be a non-empty string',
      field: 'title',
    });

  }

  if (typeof description !== 'undefined') {

    if (typeof description === 'string') {
      description = description.trim();
    } else {
      errorResponse.errors.push({
        message: 'Field description must be a string',
        field: 'description',
      });
    }

  }
  
  if (typeof isActive !== 'undefined' && typeof isActive !== 'boolean') {
    errorResponse.errors.push({
      message: 'Field isActive must be of boolean type',
      field: 'isActive',
    });
  }


  if (errorResponse.errors.length > 0) {

    return res.status(400).json(errorResponse);

  }

  try {
    
    const note = await Note.create({
      title,
      description,
      isActive
    });

    return res.status(201).json(note);

  } catch (error) {
    
    console.log('Error in createNote', error)

    return res
      .status(500)
      .json({
        message: 'Could not create note',
      });

  }

}

export const getNotes = async (req, res) => {

  let { limit, offset, isActive } = req.query;

  if (
    limit &&
    validator.isNumeric(limit, { no_symbols: true }) &&
    parseInt(limit) >= 0
  ) {
    limit = parseInt(limit);
  } else {
    limit = 10;
  }

  if (
    offset &&
    validator.isNumeric(offset, { no_symbols: true }) &&
    parseInt(offset) >= 0
  ) {
    offset = parseInt(offset);
  } else {
    offset = 0;
  }

  const where = {};

  if (isActive && validator.isIn(isActive, ['true', 'false', 'TRUE', 'FALSE'])) {
    where.isActive = isActive.toLowerCase() === 'true';
  }

  const order = ['title'];

  try {
    
    const notes = await Note.findAll({
      where,
      limit,
      offset,
      order,
    });

    const totalRecords = await Note.count({ where });

    const previousOffset = offset - limit >= 0 ? offset - limit : null;
    const nextOffset = offset + limit < totalRecords ? offset + limit : null;
    const currentPage = offset / limit + 1;
    const previousPage = previousOffset !== null ? previousOffset / limit + 1 : null;
    const nextPage = nextOffset !== null ? nextOffset / limit + 1 : null;
    const totalPages = Math.ceil(totalRecords / limit);

    const pagination = {
      limit,
      offset, 
      previousOffset,
      nextOffset,
      currentPage,
      previousPage,
      nextPage,
      totalPages,
    }

    if (notes) {
      res.status(200).json({
        totalRecords,
        notes,
        pagination,
      })
    } else {

      return res
        .status(500)
        .json({
          message: 'Could not get notes',
        });

    }

  } catch (error) {

    console.log('Error in getNotes', error)

    return res
      .status(500)
      .json({
        message: 'Could not get notes',
      });
    
  }

}

export const getOneNote = async (req, res) => {

  let id = req.params.noteId;

  if (!validator.isInt(id, { min: 1 })){
    return res.status(400).json({
      message: "Invalid note identifier",
      errors: [
        {
          message: "Route parameter must be an integer greater than zero",
          parameter: "noteId",
        },
      ],
    });
  }

  try {
    
    const note = await Note.findByPk(id);

    if (note) {
      return res.status(200).json(note);
    }

    return res.status(404).json({
      message: 'Note not found'
    })

  } catch (error) {

    console.log('Error in getOneNotes', error)

    return res
      .status(500)
      .json({
        message: 'Could not get note',
      });
    
  }

}

export const updateNote = async (req, res) => {

  const id = req.params.noteId;

  if (!validator.isInt(id, { min: 1 })){
    return res.status(400).json({
      message: "Invalid note identifier",
      errors: [
        {
          message: "Route parameter must be an integer greater than zero",
          parameter: "noteId",
        },
      ],
    });
  }

  let note;

  try {
    
    note = await Note.findByPk(id);

  } catch (error) {

    console.log('Error in updateNote', error)

    return res
      .status(500)
      .json({
        message: 'Could update note',
      });
    
  }

  if (!note) {
    return res.status(404).json({
      message: 'Note not found'
    });
  }

  let { title, description, isActive } = req.body;

  const errorResponse = {
    message: 'Incorrect fields validation error',
    errors: []
  };

  if (typeof title !== 'undefined') {

    if (typeof title === 'string' && title !== '') {
      note.title = title.trim();
    } else {
      errorResponse.errors.push({
        message: 'Field title must be a non-empty string',
        field: 'title',
      });
    }
    
  }

  if (typeof description !== 'undefined') {

    if (typeof description === 'string') {
      note.description = description.trim();
    } else {
      errorResponse.errors.push({
        message: 'Field description must be a string',
        field: 'description',
      });
    }

  }

  if (typeof isActive !== 'undefined') {

    if (typeof isActive === 'boolean') {
      note.isActive = isActive;
    } else {

      errorResponse.errors.push({
        message: 'Field isActive must be of boolean type',
        field: 'isActive',
      });

    }
    
  }

  if (errorResponse.errors.length > 0) {
    return res.status(400).json(errorResponse);
  }

  try {
    
    await note.save();

  } catch (error) {

    console.log('Error in updateNote', error)

    return res
      .status(500)
      .json({
        message: 'Could update note',
      });
    
  }

  res.status(200).json(note);

}

export const deleteNote = async (req, res) => {

  const id = req.params.noteId;

  if (!validator.isInt(id, { min: 1 })){
    return res.status(400).json({
      message: "Invalid note identifier",
      errors: [
        {
          message: "Route parameter must be an integer greater than zero",
          parameter: "noteId",
        },
      ],
    });
  }

  let note;

  try {
    
    note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({
        message: 'Note not found'
      });
    }

    await note.destroy();

    res.status(204).json();

  } catch (error) {

    console.log('Error in deleteNote', error)

    return res
      .status(500)
      .json({
        message: 'Could not delete note',
      });
    
  }

}
