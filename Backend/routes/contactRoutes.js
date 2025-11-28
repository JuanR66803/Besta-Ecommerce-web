import express from 'express';
import contactController from '../controllers/contactController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Public: create a contact message
router.post('/', contactController.createContact);

// Admin: list contact messages (requires token)
router.get('/', verifyToken, contactController.listContacts);

export default router;
