import express from 'express';
import contactController from '../controllers/contactController';

const router = express.Router();
router.post('/', contactController.createContact);
router.delete('/:id/delete', contactController.deleteContact);

export default router;
