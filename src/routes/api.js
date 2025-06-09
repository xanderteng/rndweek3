import express from 'express';
import * as controller from '../module/product/controller/product.controller.js';

const router = express.Router();

router.get('/products',        controller.getAll);
router.get('/products/:id',    controller.getById);
router.post('/products',       controller.create);
router.put('/products/:id',    controller.update);
router.delete('/products/:id', controller.remove);

export default router;
