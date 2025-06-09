import * as service from '../service/product.service.js';

export const getAll = async (req, res, next) => {
  try {
    const products = await service.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const product = await service.getProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProduct = await service.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await service.updateProduct(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteProduct(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
