import express from 'express';
const router = express.Router();

import { UserLogin,UserSignup } from '../Controller/AuthUser.js';

router.post('/signup-user',UserSignup);
router.post('/login-user',UserLogin);

export default router;