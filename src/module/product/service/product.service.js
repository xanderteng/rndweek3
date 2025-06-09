import * as repo from '../repository/product.repository.js';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  price: Joi.number().positive().required(),
});

export const getAllProducts = () => repo.getAll();

export const getProduct = (id) => repo.getById(id);

export const createProduct = async (payload) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  return repo.create(value);
};

export const updateProduct = async (id, payload) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  return repo.updateById(id, value);
};

export const deleteProduct = (id) => repo.deleteById(id);
