import express from 'express';
import * as articleCtrl from '../module/article/controller/article.controller.js';
import { authenticate } from '../middleware/auth.js';
import { permit }       from '../middleware/permit.js';

const router = express.Router();
router.get('/articles',        articleCtrl.list);
router.get('/articles/search', articleCtrl.search);
router.get('/articles/:id',    articleCtrl.getById);
router.post(
  '/articles',
  authenticate,
  permit('writer','admin'),
  articleCtrl.create
);
router.put(
  '/articles/:id',
  authenticate,
  permit('writer','admin'),
  articleCtrl.update
);
router.delete(
  '/articles/:id',
  authenticate,
  permit('writer','editor','admin'),
  articleCtrl.remove
);
router.patch(
  '/articles/:id/publish',
  authenticate,
  permit('editor'),
  articleCtrl.publish
);

export default router;
