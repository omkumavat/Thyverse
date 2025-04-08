import express from 'express';
const router = express.Router();

import { submitContact } from '../Controller/Contact.js';

router.post('/submit-contact',submitContact)

export default router;