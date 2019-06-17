import express from 'express';
import contactController from '../controllers/contactController';

const router = express.Router();
router.delete('/:id/delete', contactController.deleteContact);

export default router;
