import express from 'express';
import { check } from 'express-validator';
import UserController from '../controller/userController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('role').isIn(['student', 'instructor']).withMessage('Role must be student or instructor'),
  ],
  UserController.register
);

router.post(
  '/login',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  UserController.login
);

router.put(
  '/update',
  [
    auth,
    check('username').optional().notEmpty().withMessage('Username cannot be empty'),
    check('email').optional().isEmail().withMessage('Valid email is required'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  UserController.updateUser
);

router.get('/getUser',auth,UserController.getUser);

router.delete('/delete', auth, UserController.deleteUser);

export default router;