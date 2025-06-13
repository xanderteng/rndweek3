import express from 'express';
import * as ctrl from '../module/auth/controller/auth.controller.js';
import { authenticate } from '../middleware/auth.js';
import { permit } from '../middleware/permit.js';

const router = express.Router();
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.patch(
  '/assign-role',
  authenticate,
  permit('admin'),
  ctrl.assignRole
);

export default router;
