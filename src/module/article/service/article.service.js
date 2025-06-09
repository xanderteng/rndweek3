import * as repo from '../repository/article.repository.js';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  authorName: Joi.string().required(),
});

export const listPublished = () => repo.getPublished();

export const getArticle = (id) => repo.getById(id);

export const createArticle = async (payload) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  return repo.create(value);
};

export const updateArticle = async (id, payload) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  return repo.updateById(id, value);
};

export const deleteArticle = (id) => repo.deleteById(id);

export const publishArticle = (id) => repo.publishById(id);

export const searchArticles = (title) => repo.searchByTitle(title);
