import express from 'express';
import { postContact, getContacts } from '../controllers/random';

const route = express.Router();

route.post('/add', postContact);

route.get('/get', getContacts);

export default route;
