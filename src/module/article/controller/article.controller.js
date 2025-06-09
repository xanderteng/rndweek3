import * as service from '../service/article.service.js';

export const list = async (req, res, next) => {
  try {
    const articles = await service.listPublished();         
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const article = await service.getArticle(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const newArticle = await service.createArticle(req.body); 
    res.status(201).json(newArticle);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await service.updateArticle(req.params.id, req.body); 
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteArticle(req.params.id);               
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const publish = async (req, res, next) => {
  try {
    const published = await service.publishArticle(req.params.id); 
    res.json(published);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ message: 'Query parameter "title" is required' });
    const results = await service.searchArticles(title);     
    res.json(results);
  } catch (err) {
    next(err);
  }
};
