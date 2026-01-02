import express from 'express';
import {
  createContact,
  getContacts,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

// GET all contacts
router.get('/get', getContacts);

// POST new contact
router.post('/post', createContact);

// DELETE contact by ID
router.delete('/delete/:id', deleteContact);

export default router;
