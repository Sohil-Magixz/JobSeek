import express from 'express';
import {register, resendOtp, resetPassword, verifyOtp} from '../controllers/authController.js';
import {login} from '../controllers/authController.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyOtp)
router.post('/resendOtp', resendOtp);
router.post('/resetPassword', resetPassword);

export default router;