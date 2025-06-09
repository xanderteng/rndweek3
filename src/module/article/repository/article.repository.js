import { prisma } from '../../../helper/db.js';

export const getPublished = () => {
  return prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const getById = (id) => {
  return prisma.article.findUnique({ where: { id: Number(id) } });
};

export const create = (data) => {
  return prisma.article.create({ data });
};

export const updateById = (id, data) => {
  return prisma.article.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteById = (id) => {
  return prisma.article.delete({ where: { id: Number(id) } });
};

export const publishById = (id) => {
  return prisma.article.update({
    where: { id: Number(id) },
    data: { published: true },
  });
};

export const searchByTitle = (title) => {
  return prisma.article.findMany({
    where: {
      title: { contains: title },
    },
    orderBy: { createdAt: 'desc' },
  });
};