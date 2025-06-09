import express from 'express';
import * as articleCtrl from '../module/article/controller/article.controller.js';

const router = express.Router();

router.get('/articles',            articleCtrl.list);
router.get('/articles/search',     articleCtrl.search);
router.post('/articles',           articleCtrl.create);
router.put('/articles/:id',        articleCtrl.update);
router.delete('/articles/:id',     articleCtrl.remove);
router.patch('/articles/:id/publish', articleCtrl.publish);

export default router;
